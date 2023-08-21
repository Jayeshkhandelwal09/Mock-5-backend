const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { appointmentRouter } = require("./routes/appointment.routes");
require("dotenv").config()

const app = express();

app.use(express.json());
app.use(cors())
app.use("/users" , userRouter );
app.use("/appointments" , appointmentRouter)

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Server Connected to the DB");
    console.log(`Server is running on port ${process.env.port}`);
  } catch (error) {
    console.log(error);
    console.log("Something went Wrong");
  }
});
