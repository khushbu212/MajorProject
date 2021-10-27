const express = require("express");
const PORT = 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");
const app = express();
//configure database and mongoose
// mongoose.set("useCreateIndex", true);cd 
mongoose
  .connect(config.database, { useNewUrlParser: true })
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log({ database_error: err });
  });
// db configuaration ends here
//registering cors
app.use(cors());
//configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//configure body-parser ends here
app.use(morgan("dev")); // configire morgan
// define first route
app.get("/", (req, res) => {
  console.log("Hello MEVN Soldier");
});
const userRoutes = require("./api/user/route/user"); //bring in our user routes
const studentRoutes = require("./api/student/route/student");
const groupRoutes = require("./api/group/route/group");
const emailRoutes = require("./api/email/route/email");
app.use("/user", userRoutes);
app.use("/student", studentRoutes);
app.use("/group", groupRoutes);
app.use("/email", emailRoutes);
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});