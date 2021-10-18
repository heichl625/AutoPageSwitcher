import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store';

interface UsersState {
    id: string,
    auth: boolean;
    email: string;
    username: string;
    access_token: string;
}

const initialState: UsersState = {
    id: "",
    auth: false,
    email: "",
    username: "",
    access_token: "",
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        signin: (state, action: PayloadAction<UsersState>) => {
            console.log(action.payload)
            state = action.payload
            return state
        },
        signout: (state) => {
            state = initialState
            return state
        }
    }
})

export const { signin, signout } = usersSlice.actions;

export default usersSlice.reducer;