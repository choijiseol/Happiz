import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export type CharacterType = "fox" | "hedgehog" | "raccoon" | "squirrel";
export type CoinType = "acorn" | "blueberry" | "fish" | "mushroom";

export type User = {
    nickname: string;
    character: CharacterType;
    money: number;
    buyItem: {
        clothes: string[],
        head: string[],
        accessories: string[],
    },
    wearingItem: {
        clothes: string,
        head: string,
        accessories: string,
    },
};

interface UserState {
    nickname: string;
    character: CharacterType;
    coin: CoinType;
    money: number;
    buyItem: {
        clothes: string[],
        head: string[],
        accessories: string[],
    };
    wearingItem: {
        clothes: string,
        head: string,
        accessories: string,
    };
}

const initialState: UserState = {
    nickname: "",
    character: "squirrel",
    coin: "acorn",
    money: 0,
    buyItem: {
        clothes: [],
        head: [],
        accessories: [],
    },
    wearingItem: {
        clothes: "",
        head: "",
        accessories: "",
    },
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
        },
        setBuyItem(state, action: PayloadAction<{ clothes: string[]; head: string[]; accessories: string[]; }>) {
            state.buyItem = action.payload;
        },
        setWearingItem(state, action: PayloadAction<{ clothes: string; head: string; accessories: string; }>) {
            state.wearingItem = action.payload;
        },
    },
});

export const { setNickname, setCharacter, setCoin, setMoney, setBuyItem, setWearingItem } = userSlice.actions;
export default userSlice.reducer;
