import Flex from "../../../common/components/Flex.tsx";
import styled, {keyframes} from "styled-components";
import {useSelector} from "react-redux";
import type {RootState} from "../../../redux/store.ts";
import {useEffect, useState} from "react";
import {ClothesData} from "../../../data/wearingData.ts";

export default function WearingCharacter() {
    const character = useSelector((state: RootState) => state.user.character);
    const wearingItem = useSelector((state: RootState) => state.user.wearingItem);

    const [showGlitter, setShowGlitter] = useState(false);

    useEffect(() => {
        if (!wearingItem) return;
        setShowGlitter(true);

        const timer = setTimeout(() => {
            setShowGlitter(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [wearingItem]);

    const item = ClothesData.find(item => item.name === wearingItem.clothes);
    const clothesWidth = item ? item.imgWidth : 0;
    const clothesBottom = item ? (character === "hedgehog" ? item.hedgehogImgBottom : item.imgBottom) : 0;
    const clothesLeft = character === "fox" ? 3
        : character === "hedgehog" ? 23
            : character === "raccoon" ? -4 :
                character === "squirrel" ? -4 : 0
    const headTop = character === "fox" ? -35
        : character === "hedgehog" ? -25
            : character === "raccoon" ? -40:
                character === "squirrel" ? -35 : 0

    return <CharacterWrapper verticalBottom horizontalCenter>
        <Flex height={240} width={180} center style={{marginBottom: 200, position: "relative"}}>
            {showGlitter && <GlitterEffect/>}
            {wearingItem.clothes &&
                <img src={`/assets/img/store/wear/clothesWearing/${character}_${wearingItem.clothes}.svg`}
                     style={{
                         position: "absolute",
                         zIndex: 1,
                         width: clothesWidth,
                         bottom: clothesBottom,
                         left: clothesLeft
                     }}/>
            }
            {wearingItem.accessories &&
                <img src={`/assets/img/store/wear/accessories/${wearingItem.accessories}.svg`}
                     style={{
                         position: "absolute",
                         zIndex: 2,
                         width: 50,
                         transform: "rotate(35deg)",
                         top: 120,
                         left: clothesLeft + 40
                     }}/>
            }
            {wearingItem.head &&
                <img src={`/assets/img/store/wear/head/${wearingItem.head}.svg`}
                     style={{
                         position: "absolute",
                         width: 180,
                         zIndex: 2,
                         top: headTop,
                         left: clothesLeft - 20
                     }}/>
            }
            <img src={`/assets/img/character/${character}1.png`} style={{scale: 0.7}}/>
        </Flex>
    </CharacterWrapper>
}

const GlitterEffect = () => {
    return <GlitterWrapper width={220} height={200} row spaceBetween>
        <img src={"/assets/img/store/glitter1.svg"} width={60} style={{marginBottom: 50}}/>
        <img src={"/assets/img/store/glitter2.svg"} width={60} style={{marginTop: 50}}/>
    </GlitterWrapper>
}

const blink = keyframes`
    0%, 100% {
        opacity: 0
    }
    40%, 70% {
        opacity: 1;
    }
    50% {
        opacity: 0.6;
    }
`;

const GlitterWrapper = styled(Flex)`
    position: absolute;
    z-index: 2;
    margin-left: -40px;
    animation: ${blink} 1s ease-in-out;
`;

const CharacterWrapper = styled(Flex)`
    z-index: 3;
    width: 100%;
    height: 100%;
    position: absolute;
`