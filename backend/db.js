import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config();

const connectDB = async() =>{
    await mongoose.connect(`${process.env.MONGO_URI}`)
    .then(console.log("db connected successfully"))
    .catch((error) => {
        console.log("Error during db Connection")
        console.log(error);
        process.exit(1);
    })
}
export default connectDB