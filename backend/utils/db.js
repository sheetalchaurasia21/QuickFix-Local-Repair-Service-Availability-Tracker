import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8"]);

async function connectToDB() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("MongoDB not connected");
        console.log(error);
    }
}

export default connectToDB;