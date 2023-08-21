const express = require("express");
const { AppointmentModel } = require("../models/appointment.model");
const { auth } = require("../middleware/auth");

const appointmentRouter = express.Router();

appointmentRouter.use(auth)

appointmentRouter.post("/", auth , async (req,res)=>{
    try {
    const appointment = new AppointmentModel(req.body);
        await appointment.save();
        res.json({msg:"Appointment Booked Successfully" , appointment});
    } catch (error) {
        res.json({error:error.message})
    }
})


appointmentRouter.get("/doctors", async (req,res)=>{
    try {
        const appointment = await AppointmentModel.find()
        res.json({msg:appointment})
    } catch (error) {
        res.json({error:error.message})
    }
})

appointmentRouter.patch("/edit/:id" ,async (req,res)=>{
    const {id} = req.params;
    const updated = req.body;

    try {
        const updatedAppointment = await AppointmentModel.findByIdAndUpdate(id , updated);
        await updatedAppointment.save()
        res.json({msg:"Appointment Updated" ,updatedAppointment})
    } catch (error) {
        res.json({error:error.message})
    }
})


appointmentRouter.delete("/delete/:id", async (req,res)=>{
    const {id} = req.params;

    try {
        const DeletedAppointment = await AppointmentModel.findByIdAndDelete(id);
        res.json({msg:"Appointement Deleted" })
    } catch (error) {
        res.json({error:error.message})
    }
})

// Filtering , sorting , searching

appointmentRouter.get("/" , async(req,res)=>{
    try {
        let query = AppointmentModel.find();

        if(req.query.specialization){
            query= query.where("Specialization" , req.query.specialization)
        }

        if(req.query.date === "Date"){
            query = query.sort("Date", req.query.date)
        }

        if(req.query.search){
            query = query.where("Name" , new RegExp(req.query.search ,"i"));
        }

        let appointment = await query.exec();
        res.json({msg:appointment})
    } catch (error) {
        res.json({error:error.message})
    }
})

module.exports={
    appointmentRouter
}