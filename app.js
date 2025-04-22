const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const studentRouter = require("./routes/studentRoute");
const authMiddleware = require("./middleware/authMiddleware");
const authRouter = require("./routes/authRoute");
const dashboardRouter = require("./routes/dashboardRoute")
const env = require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connection Successfull"))
  .catch((err) => console.log(err));


const PORT = process.env.PORT || 5000;


app.use("/api/student", studentRouter)
app.use('/api/auth',authRouter)
app.use('/api/dashboard',dashboardRouter)

app.listen(PORT, () => {
  console.log("server running at port " + PORT);
});
