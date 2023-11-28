import User from "@/models/users";
import { connectDb } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async(req) => {
    try {
        await connectDb()

        const users = await User.find({})
        console.log(users)

        return new NextResponse(JSON.stringify(users), {status: 200})

    } catch (error) {
        return new NextResponse({message: 'Failed to fetch users'}, {status: 500})
    }
}