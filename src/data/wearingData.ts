export interface WearingItemType {
    type: "wearing";
    name: string;
    price: number;
    theme: string;
}

export type MergedItemType = { type: "button" } | WearingItemType;
export type WearingTheme = "all" | "countryside" | "ocean" | "winter" | "hip" | "fairy" | "job" | "lopan" | "animal" | "halloween";

export const ClothesData = [
    {name: "shoulder_strap1", price: 50, theme: "countryside"},
    {name: "shoulder_strap2", price: 50, theme: "countryside"},
    {name: "swimsuit1", price: 25, theme: "ocean"},
    {name: "swimsuit2", price: 25, theme: "ocean"},
    {name: "swimsuit_pants", price: 20, theme: "ocean"},
];

export const HeadData = [
    {name: "straw_hat", price: 30, theme: "countryside"}
];

export const AccessoriesData = [
    {name: "carrot", price: 15, theme: "countryside"},
    {name: "radish", price: 15, theme: "countryside"},
    {name: "shovel", price: 20, theme: "countryside"},
    {name: "watering_can", price: 25, theme: "countryside"},
    {name: "water_gun", price: 25, theme: "ocean"},
    {name: "tube1", price: 20, theme: "ocean"},
    {name: "tube2", price: 20, theme: "ocean"},
];

export const wearingData = {
    clothes: ClothesData,
    head: HeadData,
    characterItem: AccessoriesData,
};

export type WearingCategory = keyof typeof wearingData;
