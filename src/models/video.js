const mongoose = require('mongoose');
const path = require('path');

const { Schema } = mongoose;

const VideoSchema = new Schema({
    title: { type: String },
    description: { type: String },
    filename: { type: String },
    miniature:{type:String},
    //username: { type: String },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now }
});

VideoSchema.virtual('uniqueId')
    .get(function() {
        return this.filename.replace(path.extname(this.filename), '');
    });   

module.exports = mongoose.model('video', VideoSchema);