import { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    start_date: {
        type: Date,
        required: true,
    },

    end_date: {
        type: Date,
        required: true,
    },

    assignee: {
        name: {
            type: String,
            required: true,
        }
    },

    projects: {
        name: {
            type: String,
            required: true,
        }
    },

    description: {
        type: String,
        required: true,
    },

    priority: {
        type: Boolean,
        required: true,
    },

    file: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
    }
)

const Task = models.Task || model("Task", taskSchema)

export default Task