export interface WearingItemType {
    type: "wearing";
    name: string;
    price: number;
    theme: string;
}

export type MergedItemType = { type: "button" } | WearingItemType;

export const ClothesData = [
    {name: "shoulder_strap1", price: 50, imgWidth: 134, imgBottom: -2, hedgehogImgBottom: -9, theme: "countryside"},
    {name: "shoulder_strap2", price: 50, imgWidth: 134, imgBottom: -2, hedgehogImgBottom: -9, theme: "countryside"},
];

export const HeadData = [
    {name: "straw_hat", price: 30, theme: "countryside"}
];

export const AccessoriesData = [
    {name: "carrot", price: 15, theme: "countryside"},
    {name: "radish", price: 15, theme: "countryside"},
    {name: "shovel", price: 20, theme: "countryside"},
    {name: "watering_can", price: 25, theme: "countryside"},
];

export const wearingData = {
    clothes: ClothesData,
    head: HeadData,
    characterItem: AccessoriesData,
};

export type WearingCategory = keyof typeof wearingData;
