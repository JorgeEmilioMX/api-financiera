const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Successful connected to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB. Message: ", err);
        process.exit(1); // stop process 
    }
}; // <-- El cierre de la función debe ir AQUÍ

module.exports = connectDB;