const app = require("./app");

const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// connecting mongodb
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
  });
// app listen check 
app.listen( process.env.PORT, ()=> {
    console.log(`server is listening on http://loaclhost:${process.env.PORT} `);
}); 