'use client'
import { useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { employees, projects } from "@/constants";

const CreateTask = () => {
    const [popup, setPopup] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();

        if(popup) {
            setPopup(true)
        } else {
            setPopup(false)
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
                        />
                    </div>
                    {/* date fields */}
                    <div className="grid md:grid-cols-2 gap-5">
                        {/* start date */}
                        <div className="input_fields">
                            <label>Start date</label>
                            <input type='date' />
                        </div>
                        {/* end date */}
                        <div className="input_fields">
                            <label>End date</label>
                            <input type='date' />
                        </div>
                    </div>
                    <div className="input_fields">
                        <label>Assignee</label>
                        <select>
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
                        <textarea placeholder="Add more details to this task"></textarea>
                    </div>
                    {/* task priority level buttons */}
                    <div className="flex gap-20">
                        <div className="flex items-center gap-1">
                            <input type="radio" />
                            <label className="text-slate-500 font-semibold text-sm">Low</label>
                        </div>
                        <div className="flex items-center gap-1">
                            <input type="radio" />
                            <label className="text-slate-500 font-semibold text-sm">Normal</label>
                        </div>
                        <div className="flex items-center gap-1">
                            <input type="radio" />
                            <label className="text-slate-500 font-semibold text-sm">High</label>
                        </div>
                    </div>

                    {/* submit and cancel btns */}
                    <div className="flex items-center justify-between pt-12">
                        <input type="file" className="md:w-[30%] p-0 border-none" />
                        <div className="flex items-center gap-5">
                            <button
                                className="border border-slate-200 px-8 py-2 rounded-md font-bold"
                                onClick={() => setPopup(true)}
                            >
                                Cancel
                            </button>
                            <button type="submit"
                                className="bg-blue-400 text-white px-8 py-2 rounded-md font-bold"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>

            </form>
        </section>
    )
}

export default CreateTask