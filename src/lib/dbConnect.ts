import mongoose from "mongoose";


type ConnectionObject = {
    isConnected?: number
    // ? is optional 
}

const connection: ConnectionObject = {}
// here we face error if we not use ? above

// avoid database chocking by multiple call for database because next.js is Edge time FrameWork
async function dbConnect(): Promise<void> {
    if (connection.isConnected){
        console.log("Already connected to database");
        return
    }

    try{
        const db = await mongoose.connect(process.env.MONGODB_URI || '' ,{})

        connection.isConnected = db.connections[0].readyState

        console.log("DB Connected Successfully");

    } catch (error) {

        console.log("Database connection failed", error);

        process.exit(1)
    }
}

// void means here we not warry that what kind of data come


export default dbConnect;