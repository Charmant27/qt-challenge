'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    }
    )
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({
                    email: user.email,
                    password: user.password
                })
            })
            if (res.ok) {
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
            <form className="flex flex-col gap-12" onSubmit={handleSubmit}>

                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                    className="w-full border border-slate-200 px-6 py-3 rounded-md"

                />

                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Your password"
                    className="w-full border border-slate-200 px-6 py-3 rounded-md"

                />
                <div className="flex flex-col gap-3">
                    <input type="submit" value='sign up' className="bg-blue-400 w-[50%] text-white px-5 py-3 rounded-md" />
                    <p className="text-slate-400">Don't an account yet? <Link href='/' className="underline text-blue-400">sign up</Link></p>
                </div>
            </form>
        </section>
    )
}

export default Login