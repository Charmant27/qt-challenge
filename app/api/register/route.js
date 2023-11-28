import { NextResponse } from "next/server";
import { connectDb } from "@/utils/database";
import User from "@/models/users";
import bcrypt from "bcryptjs"

export const POST = async (req) => {
    try {
    const {name, email, password} = await req.json()
    await connectDb()
    const hashedPassword = await bcrypt.hash(password, 10)
    await User.create({name: name, email: email, password: hashedPassword})

    return new NextResponse({message: 'User was successfully created'}, {status: 201})

    } catch (error) {
        return new NextResponse({message: 'Failed to create the account'}, error, {status: 500})
    }
}