import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    tasks: [],
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
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        },
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload)
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        },
        changeStatus: (state, action) => {
            const { id, status, priority } = action.payload
            const task = state.tasks.find((task) => task.id === id)
            if (task) {
                task.status = status
                task.priority = priority
            }
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        },
        setFromLocalStorage: (state, action) => {
            state.tasks = action.payload
        },
        changeInitalState: (state, action) => {
            state.tasks = action.payload
        },
        resetTask: (state) => {
            if(localStorage.getItem('tasks')!=undefined){
                state.tasks = JSON.parse(localStorage.getItem('tasks'))
            }
        }
    }
})

export const { addTask, removeTask, changeStatus, changeInitalState, resetTask, setFromLocalStorage } = AllTasks.actions

export default AllTasks.reducer