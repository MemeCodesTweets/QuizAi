import mongoose from "mongoose"
// require('dotenv').config();

const connectDB = async() =>{
    await mongoose.connect(`mongodb+srv://memesaicrypto:QiCsXHWAuZHwNq3M@quizapp.bvsrq.mongodb.net/`)
    .then(console.log("db connected successfully"))
    .catch((error) => {
        console.log("Error during db Connection")
        console.log(error);
        process.exit(1);
    })
}
export default connectDB