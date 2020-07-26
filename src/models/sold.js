const { Schema, model } = require('mongoose');

const UserSold = new Schema({
    fileid: { type: String },
    userid: { type: String },
    status: { type: Boolean, default:false },
    filetype: {type:String},
    soldId: {type:String}
});

module.exports = model("usersold", UserSold);