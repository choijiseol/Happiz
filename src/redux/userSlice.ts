import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export type CharacterType = "fox" | "hedgehog" | "raccoon" | "squirrel";
export type CoinType = "acorn" | "blueberry" | "fish" | "mushroom";

interface UserState {
    nickname: string;
    character: CharacterType;
    coin: CoinType;
    money: number;
}

const initialState: UserState = {
    nickname: "",
    character: "squirrel",
    coin: "acorn",
    money: 0
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
        setCoin(state, action: PayloadAction<CoinType>) {
            state.coin = action.payload;
        },
        setMoney(state, action: PayloadAction<number>) {
            state.money = action.payload;
        }
    },
});

export const { setNickname, setCharacter, setCoin, setMoney } = userSlice.actions;
export default userSlice.reducer;
