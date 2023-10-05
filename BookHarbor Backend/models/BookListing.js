const mongoose = require('mongoose')
const { Schema } = mongoose;

const BookListing = new Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    author:{
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    user_Id:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('book',BookListing);