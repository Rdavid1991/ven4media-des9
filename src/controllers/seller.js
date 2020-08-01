const { User } = require('../models');

module.exports = {
    getSeller: async (req) => {
        if (req.user) {
            const { email } = req.user;

            const userSeller = await User.findOne({ email });

            return userSeller.seller;
        }else{
            return '';
        }

    }
};