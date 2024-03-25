import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    tasks: [
        {
            id: 1,
            title: "Hello world",
            description: "This is a description",
            team: "Team1",
            asignee: "User1",
            priority: "P0",
            status: "Progress"
        },

    ]
}

export const AllTasks = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            const task = {
                id: nanoid(),
                title: action.payload.title,
                description: action.payload.description,
                team: action.payload.team,
                asignee: action.payload.asignee,
                priority: action.payload.priority,
                status: action.payload.status
            }
            state.tasks.push(task)
        },
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload)
        },
        changeStatus: (state, action) => {
            const { id, status, priority } = action.payload
            const task = state.tasks.find((task) => task.id === id)
            if (task) {
                task.status = status
                task.priority = priority
            }
        },
        changeInitalState: (state, action) => {
            state.tasks = action.payload
        }
    }
})

export const { addTask, removeTask, changeStatus,changeInitalState,filterByStatus } = AllTasks.actions

export default AllTasks.reducer