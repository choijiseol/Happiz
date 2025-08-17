import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface GameState {
    colorLevel: number;
}

const initialState: GameState = {
    colorLevel: 1
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setColorLevel(state, action: PayloadAction<number>) {
            state.colorLevel = action.payload;
        },
    },
});

export const { setColorLevel } = gameSlice.actions;
export default gameSlice.reducer;
