const passport = require('passport');
const path = require('path');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { Image, Video, Audio, UserSold } = require('../models');

module.exports = {
    signup: (req, res) => {
        res.render('signup');
    },

    signupCreate: passport.authenticate("local-signup", {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        passReqToCallback: true
    }),

    signin: (req, res) => {
        res.render('signin');
    },

    signinLogin: passport.authenticate('local-signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        passReqToCallback: true
    }),

    profile: async (req, res) => {

        const images = await Image.find({ userid: req.user._id }).sort({ likes: 'desc' }).limit(5);
        const audios = await Audio.find({ userid: req.user._id }).sort({ likes: 'asc' }).limit(5);
        const videos = await Video.find({ userid: req.user._id }).sort({ likes: 'asc' }).limit(5);

        res.render('profile', { images, audios, videos, profile: true });
    },

    images: async (req, res) => {

        const images = await Image.find({ userid: req.user._id }).sort({ timestamp: 'desc' });

        res.render('profile', { images, image: true });
    },

    video: async (req, res) => {

        const videos = await Video.find({ userid: req.user._id }).sort({ timestamp: 'desc' });

        console.log(videos);

        res.render('profile', { videos, video: true });
    },

    audio: async (req, res) => {

        const audios = await Audio.find({ userid: req.user._id }).sort({ timestamp: 'desc' });

        res.render('profile', { audios, audio: true });
    },

    imagePayment: async (req, res) => {
        const { image_id } = req.params;
        const image = await Image.find({ _id: image_id });

        res.render('payment', { file: image[0], type: "image" });
    },

    stripeKey: (req, res) => {
        res.send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
    },

    pay: async (req, res) => {
        const { paymentMethodId, paymentIntentId, items, currency, useStripeSdk, fileType } = req.body;

        const orderAmount = await calculateOrderAmount(items);

        try {
            let intent;
            if (paymentMethodId) {
                // Create new PaymentIntent with a PaymentMethod ID from the client.
                intent = await stripe.paymentIntents.create({
                    amount: orderAmount,
                    currency: currency,
                    payment_method: paymentMethodId,
                    confirmation_method: "manual",
                    confirm: true,
                    // If a mobile client passes `useStripeSdk`, set `use_stripe_sdk=true`
                    // to take advantage of new authentication features in mobile SDKs
                    use_stripe_sdk: useStripeSdk,
                });
                // After create, if the PaymentIntent's status is succeeded, fulfill the order.
            } else if (paymentIntentId) {
                // Confirm the PaymentIntent to finalize payment after handling a required action
                // on the client.
                intent = await stripe.paymentIntents.confirm(paymentIntentId);
                // After confirm, if the PaymentIntent's status is succeeded, fulfill the order.
            }

            const jsonResponse = generateResponse(intent);

            const userSold = new UserSold({
                fileid: items[0].id,
                userid: req.user._id,
                filetype: fileType,
                soldId: jsonResponse.clientSecret
            });

            await userSold.save();

            res.send(jsonResponse);
        } catch (e) {
            // Handle "hard declines" e.g. insufficient funds, expired card, etc
            // See https://stripe.com/docs/declines/codes for more
            res.send({ error: e.message });
        }
    },

    download: async (req, res) => {

        let image;

        const { file_id } = req.params;

        const userSold = await UserSold.findOne({ soldId: file_id });

        console.log(userSold);

        if (userSold.filetype === "image") {
            image = await Image.findOne({ _id: userSold.fileid });
            res.download(path.resolve(__dirname,`../public/upload/images/${image.filename}`),`image_${image.title}${path.extname(image.filename)}`);
        }
    },

    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
};

const generateResponse = intent => {
    // Generate a response based on the intent's status
    switch (intent.status) {
        case "requires_action":
        case "requires_source_action":
            // Card requires authentication
            return {
                requiresAction: true,
                clientSecret: intent.client_secret
            };
        case "requires_payment_method":
        case "requires_source":
            // Card was not properly authenticated, suggest a new payment method
            return {
                error: "Your card was denied, please provide a new payment method"
            };
        case "succeeded":
            // Payment is complete, authentication not required
            // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
            console.log("💰 Payment received!");
            return { clientSecret: intent.client_secret };
    }
};

const calculateOrderAmount = async (items) => {

    const image = await Image.find({ _id: items[0].id });

    return image[0].price;
};