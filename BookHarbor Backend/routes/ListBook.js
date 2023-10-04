const express = require('express');
const router = express.Router();
const app = express();
const Book = require('./book');


router.post('/listbook',async (res,req){
    const newBook = req.body

    try {
        await Book.create(newBook);
    } catch (error) {
        console.log(error);
        res.send
    }
})