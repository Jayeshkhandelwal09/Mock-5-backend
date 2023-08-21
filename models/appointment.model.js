const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
    Name :String,
    ImageURL : String,
    Specialization : [Enum = "Cardiologist", "Dermatologist", "Pediatrician", "Psychiatrist"] ,
    Experience : Number,
    Location : String,
    Date :Number,
    Slots :Number,
    Fee :Number,
});

const AppointmentModel = mongoose.model("appointments", appointmentSchema);

module.exports = {
    AppointmentModel,
};
