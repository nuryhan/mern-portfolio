require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
connectDB();
const fileupload = require("express-fileupload");

const app = express();
// middleware
app.use(cors());
app.use(express.json());

app.use(
  fileupload({
    useTempFiles: true,
  })
);

const aboutRoute = require("./routes/aboutRoute");
const educationRoute = require("./routes/educationRoute");
const experienceRoute = require("./routes/experienceRoute");
const userRoute = require("./routes/userRoute");
const projectRoute = require("./routes/projectRoute");
const uploadRoute = require("./routes/uploadRoute");
const contactRoute = require("./routes/contactRoute");
// routes
app.use("/user", userRoute);
app.use("/", aboutRoute);
app.use("/", educationRoute);
app.use("/", experienceRoute);
app.use("/", projectRoute);
app.use("/", uploadRoute);
app.use("/contact", contactRoute);

PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server is listening on port " + PORT);
});
