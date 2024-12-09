const mongoose = require('mongoose');
// env variables
require('dotenv').config();

async function Mongo(){
const mongoUrl = process.env.MONGODB_URI;

    

mongoose.connect(mongoUrl, {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB:', err);
});}

module.exports = Mongo;
//_____________________________________________________________________________________