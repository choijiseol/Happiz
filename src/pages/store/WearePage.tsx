import Flex from "../../common/components/Flex.tsx";
import styled, {css} from "styled-components";
import Header from "../../common/components/Header.tsx";
import {useEffect, useMemo, useRef, useState} from "react";
import {
    AccessoriesData,
    ClothesData,
    HeadData,
    type MergedItemType,
    type WearingItemType, type WearingTheme
} from "../../data/wearingData.ts";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../redux/store.ts";
import WearingCharacter from "./components/WearingCharacter.tsx";
import {setWearingItem, updateWearingItem, type User} from "../../redux/userSlice.ts";
import {ButtonAnimation} from "../../common/components/styles/Button.ts";
import {useNavigate} from "react-router";

export default function WearePage() {
    const [currentType, setCurrentType] = useState<"clothes" | "head" | "accessories" | "item">("clothes");
    const [currentTheme, setCurrentTheme] = useState<WearingTheme>("all");
    const [isThemeOpen, setIsThemeOpen] = useState<boolean>(false);

    const buyItem = useSelector((state: RootState) => state.user.buyItem);
    const wearingItem = useSelector((state: RootState) => state.user.wearingItem);
    const nickname = useSelector((state: RootState) => state.user.nickname);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialWearingRef = useRef(wearingItem);
    const savedRef = useRef(false);

    useEffect(() => {
        try {
            const raw = localStorage.getItem("user");
            if (raw && nickname) {
                const users = JSON.parse(raw) as User[];
                const me = users.find(u => u.nickname === nickname);
                if (me?.wearingItem) {
                    initialWearingRef.current = me.wearingItem;
                }
            }
        } catch {
            console.log("error while loading wearingItem from localStorage");
        }
        return () => {
            if (!savedRef.current) {
                dispatch(setWearingItem(initialWearingRef.current));
            }
        }
    }, []);

    const themeList: WearingTheme[] = ["all", "countryside", "ocean", "winter", "hip", "fairy", "job", "lopan", "animal", "halloween"];

    const List = useMemo(() => {
        return currentType === "clothes"
            ? ClothesData
            : currentType === "head"
                ? HeadData
                : currentType === "accessories"
                    ? AccessoriesData
                    : null;
    }, [currentType]);

    const clothesList: WearingItemType[] = List?.map((item) => ({
        ...item,
        type: "wearing",
    })) ?? [];

    const mergedList: MergedItemType[] = [
        {type: "button"},
        ...clothesList,
    ];

    const onClickItemImg = ({currentItem, isWearing}: { currentItem: string, isWearing: boolean }) => {
        if (currentType === "clothes") {
            if (isWearing) dispatch(updateWearingItem({clothes: ""}));
            else dispatch(updateWearingItem({clothes: currentItem}));
        } else if (currentType === "head") {
            if (isWearing) dispatch(updateWearingItem({head: ""}));
            else dispatch(updateWearingItem({head: currentItem}));
        } else if (currentType === "accessories") {
            if (isWearing) dispatch(updateWearingItem({accessories: ""}));
            else dispatch(updateWearingItem({accessories: currentItem}));
        } else {
            return;
        }
    }

    const handleBefore = () => {
        if (!savedRef.current) {
            dispatch(setWearingItem(initialWearingRef.current));
        }
        navigate(-1);
    };

    const handleSave = () => {
        try {
            const raw = localStorage.getItem("user");
            if (!raw) return;
            const users = JSON.parse(raw) as User[];
            const updated = users.map(u => u.nickname === nickname ? { ...u, wearingItem } : u);
            localStorage.setItem("user", JSON.stringify(updated));
            savedRef.current = true;
            alert("저장 완료");
        } catch {
            console.log("error while saving wearingItem to localStorage");
        }
    };

    return <Wrapper>
        <BackBlur/>
        <Header hasBefore hasSave onBefore={handleBefore} onSave={handleSave}/>
        <WearingCharacter/>
        <WearWrapper height={"100%"} verticalBottom horizontalCenter>
            <Flex width={"100%"} row spaceBetween center>
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
                <ThemeFilterWrapper isThemeOpen={isThemeOpen}>
                    <ThemePopup center isOpen={isThemeOpen}>
                        {themeList.map((theme, index) =>
                            <Flex center gap={3} width={"100%"} key={theme}
                                  onClick={() => {
                                      setCurrentTheme(theme);
                                      setIsThemeOpen(false);
                                  }}
                            >
                                {index !== 0 && <Flex width={"100%"} height={1} style={{backgroundColor: "#F0F0F0"}}/>}
                                <Flex center style={{position: "relative"}}>
                                    <ButtonAnimation center>
                                        {currentTheme === theme && <CurrentThemeCircle/>}
                                        <img src={`/assets/img/store/itemIcon/${theme}.svg`} alt={theme}
                                             style={{width: 24, height: 24}}/>
                                    </ButtonAnimation>
                                </Flex>
                            </Flex>
                        )}
                    </ThemePopup>
                    <ThemeToggleButton center selected={isThemeOpen} isThemeOpen={isThemeOpen}
                                       onClick={() => setIsThemeOpen(!isThemeOpen)}>
                        <img src={`/assets/img/store/itemIcon/${currentTheme}.svg`} alt={currentTheme}
                             style={{width: 24, height: 24}}/>
                    </ThemeToggleButton>
                </ThemeFilterWrapper>
            </Flex>
            <ItemWrapper width={300} height={80} row verticalCenter>
                {mergedList.map((item) => {
                    if (item.type === "button") return <></>
                    const isWearing = currentType === "clothes"
                        ? wearingItem.clothes.includes(item.name)
                        : currentType === "head"
                            ? wearingItem.head.includes(item.name)
                            : currentType === "accessories"
                                ? wearingItem.accessories.includes(item.name)
                                : currentType === "item"
                                    ? false  //나중에 아이템 하면 조건 추가.
                                    : false
                    ;

                    const matchTheme = currentTheme === "all" || item.theme === currentTheme;
                    if (!matchTheme) return null;

                    const isBoughtInAll =
                        buyItem.clothes.includes(item.name) ||
                        buyItem.head.includes(item.name) ||
                        buyItem.accessories.includes(item.name);

                    if (!isBoughtInAll) return null;
                    return <Flex width={80} height={80} center
                                 style={{
                                     flexShrink: 0,
                                     position: "relative",
                                     backgroundColor: "#ffffff",
                                     marginBottom: isWearing ? 6 : 0,
                                     border: isWearing ? "1px solid #7A7A7A" : "none",
                                     boxShadow: isWearing ? "0 2px 2px rgba(0, 0, 0, 0.2)" : "none"
                                 }}
                                 onClick={() => onClickItemImg({currentItem: item.name, isWearing: isWearing})}>
                        <img src={`/assets/img/store/itemIcon/${item?.theme}.svg`}
                             style={{position: "absolute", width: 20, left: 4, bottom: 4, zIndex: 1}}/>
                        <img src={`/assets/img/store/wear/${currentType}/${item.name}.svg`}
                             style={{scale: currentType === "head" ? "0.5" : currentType === "accessories" ? "0.7" : "1"}}/>
                    </Flex>
                })}
            </ItemWrapper>
        </WearWrapper>
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

const WearWrapper = styled(Flex)`
    padding: 20px;
    z-index: 4;
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
    overflow-x: scroll;
    overflow-y: hidden;
    padding: 10px;
    gap: 10px;
`

const ThemeToggleButton = styled(Flex)<{ selected: boolean, isThemeOpen: boolean }>`
    z-index: 15;
    width: 50px;
    height: 30px;
    background-color: #ffffff;
    border-radius: 15px;
    transition: transform 0.2s ease-in-out;
    cursor: pointer;
    
    &:hover {
        ${({isThemeOpen}) => !isThemeOpen && css`
            transform: scale(1.1);
        `}
    }
`

const ThemeFilterWrapper = styled(Flex)<{isThemeOpen: boolean}>`
    position: relative;
    ${({isThemeOpen}) => isThemeOpen && css`
        background-color: #ffffff;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
    `};
`;

const ThemePopup = styled(Flex)<{isOpen: boolean}>`
    width: 44px;
    bottom: 30px;
    padding: 3px 3px 10px 3px;
    position: absolute;
    background-color: #ffffff;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    gap: 3px;
    z-index: 10;
    overflow-y: auto;
    transform: translateY(12px);
    
    opacity: 0.7;
    visibility: hidden;
    transition: transform 200ms ease, opacity 200ms ease, visibility 200ms ease;

    ${({isOpen}) => isOpen && css`
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
    `}
`

const CurrentThemeCircle = styled(ButtonAnimation)`
    z-index: 20;
    position: absolute;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 3px solid #2F80ED;
`
