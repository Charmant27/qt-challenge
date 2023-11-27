import mongoose from "mongoose";

let isConnected = false;

export const connectDb = async() => {
    mongoose.set("strictQuery", true)

    mongoose.connection.once('connected', () => {
        console.log('db connected successfully')
        isConnected = true
    })

    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        console.log(error)
    }
}