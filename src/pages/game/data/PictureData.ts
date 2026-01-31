export type PictureData = {
    level: "LOWER_LEVEL" | "MIDDLE_LEVEL" | "HIGH_LEVEL";
    timer: number;
    columnsNumber: number; // total cells: 15, 24, 40
    defaultCorrect: number; // number of different pictures to find: 1, 3, 5
    coin: number;
    pictures: {
        img1: string; // main variant path
        img2: string; // diff variant path
    }[];
};

export const pictureData: PictureData[] = [
    {
        level: "LOWER_LEVEL",
        timer: 20,
        columnsNumber: 15, // 3 x 5
        defaultCorrect: 1,
        coin: 1,
        pictures: [
            { img1: "/assets/img/game/picture/lower_bush1.svg", img2: "/assets/img/game/picture/lower_bush2.svg" },
            { img1: "/assets/img/game/picture/lower_cactus1.svg", img2: "/assets/img/game/picture/lower_cactus2.svg" },
            { img1: "/assets/img/game/picture/lower_cloud1.svg", img2: "/assets/img/game/picture/lower_cloud2.svg" },
            { img1: "/assets/img/game/picture/lower_compass1.svg", img2: "/assets/img/game/picture/lower_compass2.svg" },
            { img1: "/assets/img/game/picture/lower_paper1.svg", img2: "/assets/img/game/picture/lower_paper2.svg" },
            { img1: "/assets/img/game/picture/lower_tree1.svg", img2: "/assets/img/game/picture/lower_tree2.svg" },
        ]
    },
    {
        level: "MIDDLE_LEVEL",
        timer: 15,
        columnsNumber: 24, // 4 x 6
        defaultCorrect: 3,
        coin: 3,
        pictures: [
            { img1: "/assets/img/game/picture/middle_acorn1.svg", img2: "/assets/img/game/picture/middle_acorn2.svg" },
            { img1: "/assets/img/game/picture/middle_clock1.svg", img2: "/assets/img/game/picture/middle_clock2.svg" },
            { img1: "/assets/img/game/picture/middle_house1.svg", img2: "/assets/img/game/picture/middle_house2.svg" },
            { img1: "/assets/img/game/picture/middle_keyboard1.svg", img2: "/assets/img/game/picture/middle_keyboard2.svg" },
            { img1: "/assets/img/game/picture/middle_mountain1.svg", img2: "/assets/img/game/picture/middle_mountain2.svg" },
            { img1: "/assets/img/game/picture/middle_puzzle1.svg", img2: "/assets/img/game/picture/middle_puzzle2.svg" },
            { img1: "/assets/img/game/picture/middle_sign1.svg", img2: "/assets/img/game/picture/middle_sign2.svg" },
            { img1: "/assets/img/game/picture/middle_star1.svg", img2: "/assets/img/game/picture/middle_star2.svg" },
            { img1: "/assets/img/game/picture/middle_timer1.svg", img2: "/assets/img/game/picture/middle_timer2.svg" },
            // Note: filenames for log are slightly irregular (no '1' on the first variant)
            { img1: "/assets/img/game/picture/middle_log.svg", img2: "/assets/img/game/picture/middle_log2.svg" },
        ]
    },
    {
        level: "HIGH_LEVEL",
        timer: 10,
        columnsNumber: 40, // 5 x 8
        defaultCorrect: 5,
        coin: 10,
        pictures: [
            { img1: "/assets/img/game/picture/high_clover1.svg", img2: "/assets/img/game/picture/high_clover2.svg" },
            { img1: "/assets/img/game/picture/high_flower1.svg", img2: "/assets/img/game/picture/high_flower2.svg" },
            { img1: "/assets/img/game/picture/high_moon1.svg", img2: "/assets/img/game/picture/high_moon2.svg" },
            { img1: "/assets/img/game/picture/high_sun1.svg", img2: "/assets/img/game/picture/high_sun2.svg" },
            { img1: "/assets/img/game/picture/high_time1.svg", img2: "/assets/img/game/picture/high_time2.svg" },
            { img1: "/assets/img/game/picture/high_umbrage1.svg", img2: "/assets/img/game/picture/high_umbrage2.svg" },
        ]
    }
];
