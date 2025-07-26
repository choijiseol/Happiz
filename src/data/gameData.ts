export type GameType = "puzzle" | "press" | "gag" | "time" | "picture" | "color";

export interface GameInfo {
    name: string;
    listImg: string;
    type: GameType;
    hasTimer: boolean;
    hasLevel: boolean;
}

export const games: Record<string, GameInfo> = {
    color: {
        name: "다른 색 맞추기",
        listImg: "/assets/img/game/color_list.svg",
        type: "color",
        hasTimer: true,
        hasLevel: true,

    },
    picture: {
        name: "다른 그림 찾기",
        listImg: "/assets/img/game/picture_list.svg",
        type: "picture",
        hasTimer: true,
        hasLevel: true,
    },
    time: {
        name: "시간 맞추기",
        listImg: "/assets/img/game/time_list.svg",
        type: "time",
        hasTimer: false,
        hasLevel: false,
    },
    gag: {
        name: "아재개그",
        listImg: "/assets/img/game/gag_list.svg",
        type: "gag",
        hasTimer: false,
        hasLevel: false,
    },
    press: {
        name: "빠르게 누르기",
        listImg: "/assets/img/game/press_list.svg",
        type: "press",
        hasTimer: true,
        hasLevel: false,
    },
    puzzle: {
        name: "블랙퍼즐",
        listImg: "/assets/img/game/puzzle_list.svg",
        type: "puzzle",
        hasTimer: false,
        hasLevel: true,
    },
}