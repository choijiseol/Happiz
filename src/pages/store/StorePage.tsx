import styled from "styled-components";
import Flex from "../../common/components/Flex.tsx";
import Header from "../../common/components/Header.tsx";
import Text from "../../common/components/Text.tsx";
import {useState} from "react";
import {ButtonAnimation} from "../../common/components/styles/Button.ts";
import {useSelector} from "react-redux";
import type {RootState} from "../../redux/store.ts";

export default function StorePage() {
    const [store, setStore] = useState<"main" | "clothes" | "head" | "accessories" | "item">("main");
    const coin = useSelector((state: RootState) => state.user.coin);

    const signboardText = store === "main" ? "상점"
        : store === "clothes" ? "옷"
            : store === "head" ? "머리 장식"
                : store === "accessories" ? "액세서리"
                    : store === "item" ? "아이템" : "상점";

    return <Wrapper>
        <Header hasBefore hasCoin/>
        <Flex center height={"100%"}>
            <Flex center width={448} height={548} style={{position: "relative"}}>
                <img src={"/assets/img/store/store.svg"} alt="store" width={448}/>
                <Signboard center>
                    {signboardText}
                </Signboard>
                <StoreWrapper row horizontalCenter>
                    {store === "main"
                        ? <Flex gap={20} center height={"100%"}>
                            <Flex row gap={20}>
                                <ButtonAnimation onClick={() => setStore("clothes")}>
                                    <img src={"/assets/img/store/clothes_paper.svg"} alt={"옷"}/>
                                </ButtonAnimation>
                                <ButtonAnimation onClick={() => setStore("head")}>
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
                        : ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"].map((_, idx) => {
                            return <StoreItemWrapper isFirstIdx={idx === 0}>
                                {idx === 0
                                    ? <ButtonAnimation onClick={() => setStore("main")}>
                                        <img src={"/assets/img/store/store_signboard.svg"}
                                             style={{position: "absolute", left: -20, top: 15}}/>
                                    </ButtonAnimation>
                                    : <Flex>
                                        <Flex width={"100%"} height={20} row gap={4} center
                                              style={{position: "absolute", backgroundColor: "#FFFFFF", bottom: 0}}>
                                            <img src={`/assets/img/coin/${coin}.svg`} height={14}/>
                                            <Text>0000</Text>
                                        </Flex>
                                    </Flex>
                                }
                            </StoreItemWrapper>
                        })
                    }
                </StoreWrapper>
            </Flex>
        </Flex>
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

const StoreItemWrapper = styled(Flex)<{ isFirstIdx: boolean }>`
    height: 110px;
    width: 100px;
    background-color: ${({isFirstIdx}) => isFirstIdx ? "transparent" : "#FEE3BF"};
    position: relative;
`