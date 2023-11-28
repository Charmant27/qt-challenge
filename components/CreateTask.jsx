'use client'
import { useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { employees, projects } from "@/constants";
import { useRouter } from "next/navigation";

const CreateTask = () => {
    const [popup, setPopup] = useState(false)
    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [assignee, setAssignee] = useState({})
    // const [projects, setProjects] = useState({})
    const [description, setDescriptions] = useState('')
    const [priority, setPriority] = useState('')
    const [files, setFiles] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (popup) {
            setPopup(true)
        } else {
            setPopup(false)
        }

        try {
            setIsLoading(true)
            const users = await fetch('/api/users')
            const data = await users.json()
            const res = await fetch('/api/tasks/new', {
                method: 'POST',
                "content-type": 'application/json',
                body: JSON.stringify({
                    name, startDate, endDate, assignee, projects, description, priority, files
                })
            })
            if (res.ok) {
                router.push('/home')
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    }


    return (
        <section className="max-w-[1500px] h-screen flex flex-col gap-12 m-auto">
            <form onSubmit={handleSubmit} className="relative">
                {popup &&
                    <div onClick={() => setPopup(false)} className="absolute grid place-items-center w-full h-screen bg-black/40">
                        <div
                            className="popup-borders bg-white rounded-lg text-center h-[40%] w-[40%] p-20"
                        >
                            <h2 className="font-semibold pb-6">Are you sure you want to cancel the task ?</h2>
                            {/* btns */}
                            <div>
                                <button
                                    className="border border-slate-200 px-6 py-1 rounded-md mr-6"
                                    onClick={() => setPopup(false)}
                                >
                                    No
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-400 text-white px-6 py-1 rounded-md"
                                >
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                }
                <div className="pt-10 px-20">
                    {/* title section */}
                    <div className='flex justify-between'>
                        <h1 className="font-bold text-xl">Create task</h1>
                        <button
                            className="flex items-center gap-2 border border-slate-200 px-3 py-2 rounded-md"
                        >
                            <FaRegSave />
                            <span>
                                Save Draft
                            </span>
                        </button>
                    </div>
                    {/* input fields */}
                    <div className="input_fields">
                        <label>Name</label>
                        <input
                            type='text'
                            placeholder='Task name'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    {/* date fields */}
                    <div className="grid md:grid-cols-2 gap-5">
                        {/* start date */}
                        <div className="input_fields">
                            <label>Start date</label>
                            <input type='date' onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        {/* end date */}
                        <div className="input_fields">
                            <label>End date</label>
                            <input type='date' onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                    </div>
                    <div className="input_fields">
                        <label>Assignee</label>
                        <select onChange={(e) => setAssignee(e.target.value)}>
                            {employees.map((employee) => (
                                <option key={employee.id}>{employee.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input_fields">
                        <label>Projects</label>
                        <select>
                            {projects.map((project) => (
                                <option key={project.id}>{project.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input_fields">
                        <label>Description</label>
                        <textarea onChange={(e) => setDescriptions(e.target.value)} placeholder="Add more details to this task"></textarea>
                    </div>
                    {/* task priority level buttons */}
                    <div className="flex gap-20">
                        <div className="flex items-center gap-1">
                            <input type="radio" onChange={(e) => setPriority(e.target.value)} />
                            <label className="text-slate-500 font-semibold text-sm">Low</label>
                        </div>
                        <div className="flex items-center gap-1">
                            <input type="radio" onChange={(e) => setPriority(e.target.value)} />
                            <label className="text-slate-500 font-semibold text-sm">Normal</label>
                        </div>
                        <div className="flex items-center gap-1">
                            <input type="radio" onChange={(e) => setPriority(e.target.value)} />
                            <label className="text-slate-500 font-semibold text-sm">High</label>
                        </div>
                    </div>

                    {/* submit and cancel btns */}
                    <div className="flex items-center justify-between pt-12">
                        <input type="file" onChange={(e) => setFiles(e.target.value)} className="md:w-[30%] p-0 border-none" />
                        <div className="flex items-center gap-5">
                            <button
                                type="button"
                                className="border border-slate-200 px-8 py-2 rounded-md font-bold"
                                onClick={() => setPopup(true)}
                            >
                                Cancel
                            </button>
                            <button type="submit"
                                className="bg-blue-400 text-white px-8 py-2 rounded-md font-bold"
                            >
                                {isLoading ? 'Submitting' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </div>

            </form>
        </section>
    )
}

export default CreateTask