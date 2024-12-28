import express from "express"
import cors from "cors"
import connectDB from "./db.js"
import userRoute from "./routes/user.route.js"
const app = express()

app.use(cors({
    credentials: true
}))
app.use(express.json())

// connectDB()
// .then(()=>{
//     app.listen(process.env.PORT || 8800, ()=>{
//         console.log(`⚙️  Server is running`)
//     })
// })
// .catch((err)=>{
//     console.log("MongoDB Connection FAILED !!: ", err)
//     throw err
// })

app.use("/api/user", userRoute)

app.listen(8800, () => {
    connectDB();
    console.log("Srver is running")
})

