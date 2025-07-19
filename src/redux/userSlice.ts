import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export type CharacterType = "fox" | "hedgehog" | "raccoon" | "squirrel";

interface UserState {
    nickname: string;
    character: CharacterType;
}

const initialState: UserState = {
    nickname: "",
    character: "squirrel",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setNickname(state, action: PayloadAction<string>) {
            state.nickname = action.payload;
        },
        setCharacter(state, action: PayloadAction<CharacterType>) {
            state.character = action.payload;
        },
    },
});

export const { setNickname, setCharacter } = userSlice.actions;
export default userSlice.reducer;
