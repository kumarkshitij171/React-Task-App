import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    tasks: [],
    // copy of original state
    copyTask: []
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
            state.copyTask.push(task)
            localStorage.setItem('tasks', JSON.stringify(state.copyTask))
        },
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload)
            state.copyTask = state.copyTask.filter((task) => task.id !== action.payload)

            state.copyTask = state.tasks
            localStorage.setItem('tasks', JSON.stringify(state.copyTask))
        },
        changeStatus: (state, action) => {
            const { id, status, priority } = action.payload
            const task = state.tasks.find((task) => task.id === id)
            if (task) {
                task.status = status
                task.priority = priority
            }

            state.copyTask = state.tasks
            localStorage.setItem('tasks', JSON.stringify(state.copyTask))
        },
        setFromLocalStorage: (state, action) => {
            state.tasks = action.payload
            state.copyTask = action.payload
        },
        changeInitalState: (state, action) => {
            state.tasks = action.payload
        },
        resetTask: (state) => {
            state.tasks = state.copyTask
        }
    }
})

export const { addTask, removeTask, changeStatus, changeInitalState, resetTask, setFromLocalStorage } = AllTasks.actions

export default AllTasks.reducer