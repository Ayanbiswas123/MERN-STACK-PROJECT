import mongoose from "mongoose";
import { DB_name } from "../constance.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_name}`,
            {
                dbName: DB_name // Specify the database name here

            }
        )
        console.log(`\n MongoDB connection !! DB HOST:${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("error : " + error);
        process.exit(1);
    }
}
export default connectDB;