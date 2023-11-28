import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import { connectDb } from "@/utils/database";
import User from "@/models/users";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const {email, password}=credentials

                try {
                    await connectDb()
                    const user = await User.findOne({email}) 
                    if (!user) {
                        return 'user not found'
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password)
                    if(!passwordMatch){
                        return 'Incorrect password'
                    }

                    return user
                } catch (error) {
                    console.log(error)
                }
            }
        })
    ],

    session: {
        strategy: 'jwt'
    },

    secret: process.env.NEXTAUTH_SECRET,

    pages: {
        signIn: '/'
    }
}

const handler = NextAuth(authOptions)
export {handler as  GET, handler as POST}
