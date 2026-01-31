import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface GameState {
    colorLevel: number;
    pictureLevel: number;
}

const initialState: GameState = {
    colorLevel: 1,
    pictureLevel: 1,
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setColorLevel(state, action: PayloadAction<number>) {
            state.colorLevel = action.payload;
        },
        setPictureLevel(state, action: PayloadAction<number>) {
            state.pictureLevel = action.payload;
        },
    },
});

export const { setColorLevel, setPictureLevel } = gameSlice.actions;
export default gameSlice.reducer;
