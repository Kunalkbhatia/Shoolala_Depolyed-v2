const mongoose = require("mongoose");
const connectDatabase = ()=> {
    mongoose.connect(process.env.DB_URI)
    .then((data)=> {
    console.log(`mongoDb connected with server: ${data.connection.host}`);
    }).catch((error)=>{
    console.log(error);
    })

}

module.exports = connectDatabase;