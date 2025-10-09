import Flex from "../../common/components/Flex.tsx";
import styled, {css} from "styled-components";
import Header from "../../common/components/Header.tsx";
import {useMemo, useState} from "react";
import {AccessoriesData, ClothesData, HeadData, type MergedItem, type WearingItem} from "../../data/wearingData.ts";
import {useSelector} from "react-redux";
import type {RootState} from "../../redux/store.ts";
import WearingCharacter from "./components/WearingCharacter.tsx";

export default function WearePage() {
    const [currentType, setCurrentType] = useState<"clothes" | "head" | "accessories" | "item">("clothes");
    const buyItem = useSelector((state: RootState) => state.user.buyItem);

    const List = useMemo(() => {
        return currentType === "clothes"
            ? ClothesData
            : currentType === "head"
                ? HeadData
                : currentType === "accessories"
                    ? AccessoriesData
                    : null;
    }, [currentType]);

    const clothesList: WearingItem[] = List?.map((item) => ({
        ...item,
        type: "wearing",
    })) ?? [];

    const mergedList: MergedItem[] = [
        {type: "button"},
        ...clothesList,
    ];

    // const onClickChangeType = () => {
    //     setCurrentType();
    // }
    return <Wrapper>
        <BackBlur/>
        <Header hasBefore hasSave/>
        <WearingCharacter/>
        <WeareWrapper height={"100%"} verticalBottom horizontalCenter>
            <Flex width={320} row flexStart verticalBottom style={{paddingLeft: 15}}>
                <TypeChangeButton center isLeft selected={currentType === "clothes"}
                                  onClick={() => setCurrentType("clothes")}>
                    <img src={"/assets/img/store/clothes_icon.svg"} alt={"옷"}/>
                </TypeChangeButton>
                <Line/>
                <TypeChangeButton center selected={currentType === "head"}
                                  onClick={() => setCurrentType("head")}>
                    <img src={"/assets/img/store/head_icon.svg"} alt={"머리 장식"}/>
                </TypeChangeButton>
                <Line/>
                <TypeChangeButton center selected={currentType === "accessories"}
                                  onClick={() => setCurrentType("accessories")}>
                    <img src={"/assets/img/store/accessories_icon.svg"} alt={"액세서리"}/>
                </TypeChangeButton>
                <Line/>
                <TypeChangeButton center isRight selected={currentType === "item"}
                                  onClick={() => setCurrentType("item")}>
                    <img src={"/assets/img/store/item_icon.svg"} alt={"아이템"}/>
                </TypeChangeButton>
            </Flex>
            <ItemWrapper width={300} height={80} row verticalCenter>
                {mergedList.map((item) => {
                    if (item.type === "button") return <></>
                    const isBoughtInAll =
                        buyItem.clothes.includes(item.name) ||
                        buyItem.head.includes(item.name) ||
                        buyItem.accessories.includes(item.name);

                    if (!isBoughtInAll) return null;
                    return <Flex width={80} height={80} center style={{backgroundColor: "#ffffff"}}>
                        <img src={`/assets/img/store/weare/${currentType}/${item.name}.svg`}
                             style={{scale: currentType === "head" ? "0.5" : currentType === "accessories" ? "0.5" : "1"}}/>
                    </Flex>
                })}
            </ItemWrapper>
        </WeareWrapper>
    </Wrapper>
}

// 중복 많음. (ex StorePage)
const Wrapper = styled(Flex)`
    position: relative;
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

const WeareWrapper = styled(Flex)`
    padding: 20px;
    z-index: 5;
`

const TypeChangeButton = styled(Flex)<{ isLeft?: boolean, isRight?: boolean, selected: boolean }>`
    width: ${({isLeft, isRight}) => isLeft || isRight ? 45 : 40}px;
    height: 35px;
    background-color: #ffffff;
    cursor: pointer;

    ${({isLeft}) => isLeft && css`
        border-top-left-radius: 20px;
    `};
    ${({isRight}) => isRight && css`
        border-top-right-radius: 20px;
    `};
    ${({selected}) => selected === true && css`
        border: 1px solid #7A7A7A;
    `
    };
`

const Line = styled.div`
    width: 1px;
    height: 35px;
    background-color: #D8D8D8;
`

const ItemWrapper = styled(Flex)`
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 10px;
    overflow: hidden;
    padding: 10px;
    gap: 10px;
`
