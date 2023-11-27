import User from "@/models/users";
import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import { connectDb } from "@/utils/database";

export const GET = async(req) => {
    const {email, password} = req.body;

    try {
        await connectDb()
        const user = await User.find({email, password});
            return new NextResponse(JSON.stringify(user), {status: 200})
    } catch (error) {
        return new NextResponse({message: "Authentication failed", error}, {status: 500})
    }
}