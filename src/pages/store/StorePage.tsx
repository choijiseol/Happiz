import styled from "styled-components";
import Flex from "../../common/components/Flex.tsx";
import Header from "../../common/components/Header.tsx";
import Text from "../../common/components/Text.tsx";
import {useMemo, useState} from "react";
import {ButtonAnimation} from "../../common/components/styles/Button.ts";
import {useSelector} from "react-redux";
import type {RootState} from "../../redux/store.ts";
import {useNavigate} from "react-router";
import {
    AccessoriesData,
    ClothesData,
    HeadData,
    type MergedItemType,
    type WearingItemType
} from "../../data/wearingData.ts";
import PurchaseModal from "./components/PurchaseModal.tsx";

export default function StorePage() {
    const [store, setStore] = useState<"main" | "clothes" | "head" | "accessories" | "item">("main");
    const [openPurchase, setOpenPurchase] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<WearingItemType | null>(null);
    const coin = useSelector((state: RootState) => state.user.coin);
    const character = useSelector((state: RootState) => state.user.character);
    const navigate = useNavigate();

    const signboardText = store === "main" ? "상점"
        : store === "clothes" ? "옷"
            : store === "head" ? "머리 장식"
                : store === "accessories" ? "액세서리"
                    : store === "item" ? "아이템" : "상점";

    const List = useMemo(() => {
        return store === "clothes"
            ? ClothesData
            : store === "head"
                ? HeadData
                : store === "accessories"
                    ? AccessoriesData
                    : null;
    }, [store]);

    const clothesList: WearingItemType[] = List?.map((item) => ({
        ...item,
        type: "wearing",
    })) ?? [];

    const mergedList: MergedItemType[] = [
        {type: "button"},
        ...clothesList,
    ];

    const buyItem = useSelector((state: RootState) => state.user.buyItem);
    const checkPurchased = (item: WearingItemType): boolean => {
        if (!buyItem) return false;
        if (store === "clothes") {
            return buyItem.clothes.includes(item.name);
        } else if (store === "head") {
            return buyItem.head.includes(item.name);
        } else if (store === "accessories") {
            return buyItem.accessories.includes(item.name);
        }
        return false;
    };

    return <Wrapper>
        <BackBlur/>
        <Header hasBefore hasCoin setOpenPurchase={(store === "main" || !openPurchase) ? null : setOpenPurchase}/>
        <GoDressWrapper>
            <Flex width={"100%"} style={{position: "relative"}} onClick={() => navigate('/store/weare')}>
                <img src={"/assets/img/store/speech-bubble.svg"} width={132}
                     style={{position: "absolute", bottom: 20, right: 155}}/>
                <img src={`/assets/img/character/${character}1.svg`} height={203}
                     style={{position: "absolute", bottom: -60, right: 10}}/>
            </Flex>
        </GoDressWrapper>
        <Flex center height={"100%"}>
            <Flex center width={448} height={548} style={{position: "relative", zIndex: 3}}>
                <img src={"/assets/img/store/store.svg"} alt="store" width={448}/>
                <Signboard center>
                    {signboardText}
                </Signboard>
                <StoreWrapper row horizontalCenter>
                    {store === "main"
                        ? <Flex gap={10} height={"100%"}>
                            <Flex row gap={20}>
                                <ButtonAnimation onClick={() => setStore("clothes")} style={{paddingTop: 5}}>
                                    <img src={"/assets/img/store/clothes_paper.svg"} alt={"옷"}/>
                                </ButtonAnimation>
                                <ButtonAnimation onClick={() => setStore("head")} style={{paddingTop: 5}}>
                                    <img src={"/assets/img/store/head_paper.svg"} alt={"머리 장식"}/>
                                </ButtonAnimation>
                            </Flex>
                            <Flex row gap={20}>
                                <ButtonAnimation onClick={() => setStore("accessories")}>
                                    <img src={"/assets/img/store/accessories_paper.svg"} alt={"액세서리"}/>
                                </ButtonAnimation>
                                <ButtonAnimation onClick={() => setStore("item")}>
                                    <img src={"/assets/img/store/item_paper.svg"} alt={"아이템"}/>
                                </ButtonAnimation>
                            </Flex>
                        </Flex>
                        : mergedList && mergedList.map((item, idx) => {
                        const purchaseCompleted =
                            item.type !== "button" ? checkPurchased(item) : false;

                        return <StoreItemWrapper isFirstIdx={idx === 0} purchaseCompleted={purchaseCompleted}
                                                 onClick={() => {
                                                     if (!purchaseCompleted && item.type !== "button") {
                                                         setOpenPurchase(true)
                                                         setSelectedItem(item);
                                                     }
                                                 }}>
                            {idx === 0 ? <ButtonAnimation onClick={() => setStore("main")}>
                                    <img src={"/assets/img/store/store_signboard.svg"}
                                         style={{position: "absolute", left: -20, top: 15}}/>
                                </ButtonAnimation>
                                : item.type !== "button" &&
                                <Flex center height={"100%"} style={{position: "relative"}}>
                                    <img src={`/assets/img/store/itemIcon/${item.theme}.svg`}
                                         style={{position: "absolute", width: 20, left: 4, top: 4}}/>
                                    <img src={`/assets/img/store/wear/${store}/${item.name}.svg`}
                                         style={{
                                             height: store === "accessories" ? 60 : "auto",
                                             maxWidth: 90,
                                             scale: store === "head" ? 0.7 : 1,
                                             marginBottom: 10,
                                         }}/>
                                    <Flex width={"100%"} height={20} row gap={4} center
                                          style={{position: "absolute", backgroundColor: "#FFFFFF", bottom: 0}}>
                                        {!purchaseCompleted && <img src={`/assets/img/coin/${coin}.svg`} height={14}/>}
                                        <Text>{purchaseCompleted ? "구매완료" : item.price}</Text>
                                    </Flex>
                                </Flex>
                            }
                            {idx !== 0 && purchaseCompleted &&
                                <PurchaseCompleted/>
                            }
                        </StoreItemWrapper>
                    })}
                </StoreWrapper>
            </Flex>
        </Flex>
        {openPurchase && <PurchaseModal selectedItem={selectedItem} store={store} setOpenPurchase={setOpenPurchase}/>}
    </Wrapper>
}

const Wrapper = styled(Flex)`
    background-image: url("/assets/img/main_back.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: hidden;
`

const BackBlur = styled(Flex)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.5);
    filter: blur(4px);
    z-index: 1;
`

const GoDressWrapper = styled(Flex)`
    width: 100%;
    z-index: 4;
    position: fixed;
    bottom: 0;
    cursor: pointer;
`

const Signboard = styled(Flex)`
    position: absolute;
    background-image: url("/assets/img/store/signboard.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    z-index: 2;
    width: 204px;
    height: 74px;
    top: 65px;

    font-size: 24px;
    font-weight: 700;
    color: #000000;
`;

const StoreWrapper = styled(Flex)`
    position: absolute;
    height: 290px;
    width: 280px;
    z-index: 3;
    bottom: 41px;
    margin-left: 12px;
    overflow-y: auto;
    flex-wrap: wrap;
    gap: 20px;

    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }
`

const StoreItemWrapper = styled(Flex)<{ isFirstIdx: boolean, purchaseCompleted: boolean }>`
    height: 110px;
    width: 100px;
    background-color: ${({isFirstIdx}) => isFirstIdx ? "transparent" : "#FEE3BF"};
    position: relative;
    cursor: ${({purchaseCompleted}) => purchaseCompleted ? "auto" : "pointer"};
`

const PurchaseCompleted = styled(Flex)`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
`