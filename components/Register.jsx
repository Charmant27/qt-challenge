'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const createUser = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            if (res.ok) {
                router.refresh()
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="bg-white shadow-2xl px-40 py-20 rounded-md">
            <div className="pb-8">
                <h1 className="text-blue-400 text-2xl font-bold">Task Manager</h1>
            </div>
            <form className="flex flex-col gap-12" onSubmit={createUser}>
                <input
                    type="text"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="border border-slate-200 px-6 py-3 rounded-md"

                />

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
                    <input type="submit" value='sign up' className="bg-blue-400 w-[50%] text-white px-5 py-3 rounded-md" />
                    <p className="text-slate-400">Have an account? <Link href='/login' className="underline text-blue-400">Login</Link></p>
                </div>
            </form>
        </section>
    )
}

export default Register