const { Schema, model } = require('mongoose');

const UserLikeSchema = new Schema({
    imgId: { type: String },
    user: { type: String },
    status: { type: Boolean }
});

module.exports = model("userLike", UserLikeSchema);