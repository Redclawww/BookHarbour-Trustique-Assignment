const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://raghav:mom@clusterbook.4dxnbc1.mongodb.net/BookHarbour?retryWrites=true&w=majority";

const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---", err)
        else {
            console.log("connected");
        }   }
    );
       
}

module.exports = mongoDB;

