module.exports = async (model , id) => {
    
    const item = await model.findOne({ _id: id });

    item.likes = item.likes + 1;
    await item.save();
    
    //const user = await UserLike.findOne({ user: req.user.email, imgId: String(img._id) });
    /* if (user) {
        if (img) {
            if (user.status === true) {
                img.likes = img.likes - 1;
                user.status = false;
            } else if (user.status === false) {
                img.likes = img.likes + 1;
                user.status = true;
            }
        } else {
            res.status(500).json({ error: 'internal error' });
        }
        await user.save();
        await img.save();
        res.json({ like: img.likes, status: user.status });
    } else {
        const newuser = new UserLike({
            imgId: img._id,
            user: req.user.email,
            status: true,
        });
        img.likes = img.likes + 1;
        await img.save();
        await newuser.save();
        res.json({ like: img.likes, status: newuser.status });
    } */
    //}

    return item.likes;
}