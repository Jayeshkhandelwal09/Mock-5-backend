const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { appointmentRouter } = require("./routes/appointment.routes");
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cors())
app.use("/users" , userRouter );
app.use("/appointments" , appointmentRouter)

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Server Connected to the DB");
    console.log("Server is running on port 8080");
  } catch (error) {
    console.log(error);
    console.log("Something went Wrong");
  }
});
