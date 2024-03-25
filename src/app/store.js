import { configureStore } from '@reduxjs/toolkit';
import AllTasks from '../features/task/taskSlice.js';

export const store = configureStore({
    reducer: AllTasks
})