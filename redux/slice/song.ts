import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store';

interface SongState {
    youtube_url: string;
    timestamps: number[];
    document?: string | ArrayBuffer | null;
}

const initialState: SongState = {
    youtube_url: "",
    timestamps: [],
}

export const songSlice = createSlice({
    name: 'song',
    initialState,
    reducers: {
        syncSong: (state, action: PayloadAction<SongState>) => {
            return action.payload;
        }
    }
})

export const { syncSong } = songSlice.actions;

export default songSlice.reducer;