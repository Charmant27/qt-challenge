'use client'
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false
            })
            if(res.error) {
                setErrorMessage('Invalid credentials')
                return
            }
            router.replace('/create-task')
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <section className="bg-white shadow-2xl px-40 py-20 rounded-md">
            <div className="pb-8">
                <h1 className="text-blue-400 text-2xl font-bold">Task Manager</h1>
            </div>
            {errorMessage && (
                <div className="pb-5">
                    <h3 className="text-red-500 font-semibold text-lg">{errorMessage}</h3>
                </div>
            )}
            <form className="flex flex-col gap-12" onSubmit={handleSubmit}>

                <input
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full border border-slate-200 px-6 py-3 rounded-md"

                />

                <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    className="w-full border border-slate-200 px-6 py-3 rounded-md"

                />
                <div className="flex flex-col gap-3">
                    <input type="submit" value='Login' className="bg-blue-400 w-[50%] text-white px-5 py-3 rounded-md" />
                    <p className="text-slate-400">Don't an account yet? <Link href='/register' className="underline text-blue-400">sign up</Link></p>
                </div>
            </form>
        </section>
  )
}

export default Login