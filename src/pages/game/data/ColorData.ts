export type ColorData = {
    level: "LOWER_LEVEL" | "MIDDLE_LEVEL" | "HIGH_LEVEL";
    timer: number;
    columnsNumber: number;
    defaultColor: number;
    coin: number;
    color: {
        color1: string;
        color2: string;
    }[];
};

export const colorData: ColorData[] = [
    {
        level: "LOWER_LEVEL",
        timer: 20,
        columnsNumber: 4,
        defaultColor: 1,
        coin: 1,
        color: [
            {color1: "#F35151", color2: "#7C1414"},
            {color1: "#6F77ED", color2: "#1D28C2"},
            {color1: "#49AA46", color2: "#136910"},
            {color1: "#AF8C8C", color2: "#873838"},
            {color1: "#60C3D2", color2: "#227683"},
            {color1: "#E270DC", color2: "#9E2C99"},
        ]
    },
    {
        level: "MIDDLE_LEVEL",
        timer: 15,
        columnsNumber: 8,
        defaultColor: 2,
        coin: 3,
        color: [
            {color1: "#E96464", color2: "#D43A3A"},
            {color1: "#4B53CD", color2: "#2730AE"},
            {color1: "#7BDF78", color2: "#4CC248"},
            {color1: "#E38686", color2: "#C67A7A"},
            {color1: "#74C3E8", color2: "#55ACD5"},
            {color1: "#F491EF", color2: "#E679E0"},
        ]
    },
    {
        level: "HIGH_LEVEL",
        timer: 10,
        columnsNumber: 16,
        defaultColor: 3,
        coin: 10,
        color: [
            {color1: "#FF8B8B", color2: "#F47F7F"},
            {color1: "#333AA5", color2: "#2E38CE"},
            {color1: "#247E21", color2: "#1E741B"},
            {color1: "#AE3DF5", color2: "#A326F1"},
            {color1: "#9FE1FF", color2: "#8DD8FA"},
            {color1: "#E832DF", color2: "#DD26D4"},
        ]
    }
];