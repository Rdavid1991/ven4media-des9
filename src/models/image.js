const mongoose = require('mongoose');
const path = require('path');

const { Schema } = mongoose;

const ImageSchema = new Schema({
    title: { type: String },
    description: { type: String },
    filename: { type: String },
    userid: { type: String },
    status:{type: Boolean,default:false},
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now }
});

ImageSchema.virtual('uniqueId')
    .get(function() {
        return this.filename.replace(path.extname(this.filename), '');
    });   

module.exports = mongoose.model('image', ImageSchema);