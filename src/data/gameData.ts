export type GameType = "color" | "picture" | "time" | "gag" | "press" | "puzzle";

export interface GameInfo {
    type: GameType;
    name: string;
    listImg: string;
    hasTimer: boolean;
    hasLevel: boolean;
}

export const games: Record<string, GameInfo> = {
    color: {
        type: "color",
        name: "다른 색 맞추기",
        listImg: "/assets/img/game/color_list.svg",
        hasTimer: true,
        hasLevel: true,
    },
    picture: {
        type: "picture",
        name: "다른 그림 찾기",
        listImg: "/assets/img/game/picture_list.svg",
        hasTimer: true,
        hasLevel: true,
    },
    time: {
        type: "time",
        name: "시간 맞추기",
        listImg: "/assets/img/game/time_list.svg",
        hasTimer: false,
        hasLevel: false,
    },
    gag: {
        type: "gag",
        name: "아재개그",
        listImg: "/assets/img/game/gag_list.svg",
        hasTimer: false,
        hasLevel: false,
    },
    press: {
        type: "press",
        name: "빠르게 누르기",
        listImg: "/assets/img/game/press_list.svg",
        hasTimer: true,
        hasLevel: false,
    },
    puzzle: {
        type: "puzzle",
        name: "블랙퍼즐",
        listImg: "/assets/img/game/puzzle_list.svg",
        hasTimer: false,
        hasLevel: true,
    },
}