import Task from "@/models/tasks";
import { NextResponse } from "next/server";
import { connectDb } from "@/utils/database";
import User from "@/models/users";


export const POST = async (req) => {
    try {
        await connectDb()
        const users = await User.find({})
        const { name, start_date, end_date, assignee, projects, description, priority, file } = await req.json()

        const task = await Task.create({
            name: name,
            start_date: start_date,
            end_date: end_date,
            assignee: assignee,
            projects: projects,
            description: description,
            priority: priority,
            file: file
        })

        console.log({
            "name": name,
            "start_date": start_date,
            "end_date": end_date,
            "assignee": users,
            "projects": projects,
            "description": description,
            "priority": priority,
            "file": file
        })

        if(!task) {
            return new NextResponse({message: 'Invalid input'}, {status: 400})
        }

        return new NextResponse(JSON.stringify(task), {status: 201})

    } catch (error) {
        return new NextResponse(
            { message: 'Failed to create task' },
            error,
            { status: 500 }
        )
    }
}