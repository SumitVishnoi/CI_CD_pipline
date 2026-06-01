import "dotenv/config"
import express from "express"
import morgan from "morgan"
import mongoose from "mongoose"
import userModel from "./models/user.model.js"

const connectDb = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to DB")
    } catch (error) {
        console.log("DB error", error)
    }
}

export const sum = (a, b)=> {
    return a + b;
}

const app = express()

app.use(morgan("dev"))
app.use(express.json())

app.get("/sum", (req, res)=> {
    const a = 20;
    const b = 30;
    const total = sum(a, b)
    res.status(200).json(total)
})

app.get("/", (req, res)=> {
    res.status(200).json({
        status:"OK"
    })
})

connectDb()

app.post("/api/user", async (req, res)=> {
    const {name, email} = req.body;

    const user = await userModel.create({
        name,
        email
    })

    res.status(201).json({
        message: "User created successfully",
        user
    })
})

app.get("/api/user", async (req, res)=> {
    const user = await userModel.find()

    res.status(200).json({
        message: "User fetched successfully",
        user
    })
})


app.listen(3000, ()=> {
    console.log("Server is running on port 3000")
})