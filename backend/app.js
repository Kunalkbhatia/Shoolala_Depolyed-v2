const express = require("express");
const errorMiddleware = require("./middleware/error")
const cookieParser = require("cookie-parser");
const cors = require('cors');
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");


app.use(cors({
  origin: true,
  credentials: true
}));
app.use(cookieParser());
app.use(fileUpload());
app.use(express.json({
    limit: '100mb'
  }));



  if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }
  



//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1",product); 
app.use("/api/v1/",user);
app.use("/api/v1/",order);
app.use("/api/v1/",payment);



// Middleware for errors
app.use(errorMiddleware);

module.exports = app;

