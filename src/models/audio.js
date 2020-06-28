const mongoose = require('mongoose');


const { Schema } = mongoose;

const videoSchema = new Schema({
    title: String,
    filename: String,
    description: String,

});

module.exports = mongoose.model('audio', videoSchema);