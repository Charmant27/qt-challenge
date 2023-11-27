import { NextResponse } from "next/server";
import { connectDb } from "@/utils/database";
import User from "@/models/users";
import bcrypt from "bcrypt"

export const POST = async (req) => {
    try {
        const body = await req.json()
        const user = body.formData

        await connectDb()
        const hashedPassword = await bcrypt.hash(user.password, 10)
        user.password = hashedPassword
        const newUser = await User.create(user)

        
        return new NextResponse(JSON.stringify(newUser), { status: 201 });


    } catch (error) {
        return new NextResponse({ message: 'Failed to create user', error }, { status: 500 })
    }
}