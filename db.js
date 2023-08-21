const mongoose = require("mongoose");


const connection = mongoose.connect("mongodb+srv://Jayesh:khandelwal@cluster0.lizzrd7.mongodb.net/Appointments?retryWrites=true&w=majority")

module.exports={
    connection
}