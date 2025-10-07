export interface WearingItem {
    type: "wearing";
    name: string;
    price: number;
}

export const ClothesData = [
    {name: "shoulder_strap1", price: 50},
    {name: "shoulder_strap2", price: 50},
];

export const HeadData = [
    {name: "straw_hat", price: 30}
];

export const AccessoriesData = [
    {name: "carrot", price: 15},
    {name: "radish", price: 15},
    {name: "shovel", price: 20},
    {name: "watering_can", price: 25},
];

export const wearingData = {
    clothes: ClothesData,
    head: HeadData,
    characterItem: AccessoriesData,
};

export type WearingCategory = keyof typeof wearingData;
