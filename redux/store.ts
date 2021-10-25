import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './slice/users';
import songReducer from './slice/song';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        song: songReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch