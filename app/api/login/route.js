import User from "@/models/users";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { connectDb } from "@/utils/database";

export const POST = async(req) => {
    const {email, password} = req.body;

    try {
        await connectDb()
        const user = await User.findOne({email});
        console.log(user)
        if(!user) {
            console.log('can not find user')
        } else {
           return new NextResponse(JSON.stringify(user), {status: 201}) 
        }
        // if(user && await bcrypt.compare(password, user.password)) {
        //     return new NextResponse(JSON.stringify(user), {status: 200})
        // }
        return new NextResponse({message: 'User found'}) 
           
    } catch (error) {
        return new NextResponse({message: "Authentication failed", error}, {status: 500})
    }
}