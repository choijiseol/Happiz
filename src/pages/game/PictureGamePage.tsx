import Flex from "../../common/components/Flex.tsx";
import styled from "styled-components";
import GameLevelText from "./components/GameLevelText.tsx";
import {useEffect, useMemo, useState} from "react";
import GameTimer from "./components/GameTimer.tsx";
import ReadyModal from "./components/ReadyModal.tsx";
import FinishModal from "./components/FinishModal.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../redux/store.ts";
import {pictureData} from "./data/PictureData.ts";

export default function PictureGamePage() {
    const pictureLevel = useSelector((state: RootState) => state.game.pictureLevel);

    const [start, setStart] = useState<boolean>(false);
    const [end, setEnd] = useState<boolean>(false);
    const [isClear, setIsClear] = useState<"CLEAR" | "PLAY" | "FALL">("PLAY");
    const [foundDiffs, setFoundDiffs] = useState<number[]>([]);
    const [wrongIndex, setWrongIndex] = useState<number | null>(null);

    useEffect(() => {
        if (!start && isClear === "PLAY") {
            const timerId = setTimeout(() => setStart(true), 3000);
            return () => clearTimeout(timerId);
        }
    }, [isClear, start]);

    const levelData = useMemo(() => {
        if (pictureLevel <= 4) return pictureData.find(d => d.level === "LOWER_LEVEL")!;
        if (pictureLevel <= 8) return pictureData.find(d => d.level === "MIDDLE_LEVEL")!;
        return pictureData.find(d => d.level === "HIGH_LEVEL")!;
    }, [pictureLevel]);

    const randomPicturePair = useMemo(() => {
        if (isClear !== "PLAY") return {
            main: "/assets/img/game/picture/lower_bush1.svg",
            diff: "/assets/img/game/picture/lower_bush1.svg"
        };
        const pair = levelData.pictures[Math.floor(Math.random() * levelData.pictures.length)];
        return Math.random() > 0.5
            ? {main: pair.img1, diff: pair.img2}
            : {main: pair.img2, diff: pair.img1};
    }, [levelData, isClear]);

    const {gridImages, diffIndexes} = useMemo(() => {
        const arr = Array(levelData.columnsNumber).fill(randomPicturePair.main);
        const diffs: number[] = [];

        while (diffs.length < levelData.defaultCorrect) {
            const idx = Math.floor(Math.random() * levelData.columnsNumber);
            if (!diffs.includes(idx)) diffs.push(idx);
        }
        diffs.forEach(idx => {
            arr[idx] = randomPicturePair.diff;
        });

        return {gridImages: arr as string[], diffIndexes: diffs};
    }, [levelData, randomPicturePair, isClear]);

    useEffect(() => {
        if (end) {
            setIsClear("FALL");
        }
    }, [end]);

    const handleClick = (index: number) => {
        if (isClear !== "PLAY") return;

        if (diffIndexes.includes(index)) {
            if (!foundDiffs.includes(index)) {
                const updated = [...foundDiffs, index];
                setFoundDiffs(updated);

                if (updated.length === diffIndexes.length) {
                    setIsClear("CLEAR");
                    setStart(false);
                }
            }
        } else {
            setWrongIndex(index);
            setIsClear("FALL");
            setStart(false);
        }
    };

    useEffect(() => {
        if (isClear === "PLAY") {
            setFoundDiffs([]);
            setWrongIndex(null);
            setEnd(false);
        }
    }, [isClear]);

    return <Flex center gap={26} height={"100%"}>
        {!start && isClear === "PLAY" && <ReadyModal/>}
        {isClear !== "PLAY" &&
            <FinishModal fall={isClear === "FALL" || end} clear={isClear === "CLEAR" && !end}
                         gameFinish={isClear === "CLEAR" && pictureLevel === 10} setStart={setStart}
                         setIsClear={setIsClear} levelCoin={levelData.coin} gameType={"picture"}/>
        }
        <Flex gap={15} center>
            <GameLevelText level={pictureLevel}/>
            <GameTimer timer={levelData.timer}
                start={start}
                stop={isClear !== "PLAY"}
                setEnd={setEnd}/>
        </Flex>
        <PicturePlayWrapper center level={levelData.level}>
            {gridImages.map((src, i) => (
                <ImageBlock key={i} center level={levelData.level} onClick={() => handleClick(i)}>
                    <img src={src} alt={"img"} width={"70%"} height={"70%"}/>
                    {foundDiffs.includes(i) &&
                        <CorrectIcon src={"/assets/img/icon/correct_picture.svg"} width={40} alt={"정답"}/>}
                    {wrongIndex === i && <CorrectIcon src={"/assets/img/icon/fall_picture.svg"} width={40} alt={"오답"}/>}
                </ImageBlock>
            ))}
        </PicturePlayWrapper>
    </Flex>
}

const PicturePlayWrapper = styled(Flex)<{ level: string }>`
    border-radius: 20px;
    background-color: #FFFFFF;
    display: grid;
    justify-content: center;
    align-content: flex-start;

    ${({level}) => level === "LOWER_LEVEL" && `
        width: 280px;
        height: 440px;
        grid-template-columns: repeat(3, auto);
        padding: 30px 20px;
        gap: 10px;
    `}

    ${({level}) => level === "MIDDLE_LEVEL" && `
        grid-template-columns: repeat(4, auto);
        width: 280px;
        height: 410px;
        padding: 45px 20px;
        column-gap: 13px;
        row-gap: 10px;
    `}

    ${({level}) => level === "HIGH_LEVEL" && `
        grid-template-columns: repeat(5, auto);
        width: 280px;
        height: 430px;
        padding: 35px 20px;
        column-gap: 13px;
        row-gap: 10px;
    `}
`;

const ImageBlock = styled(Flex)<{ level: string }>`
    background-color: #ffffff;
    border-radius: 4px;
    border: 1px solid gray;
    cursor: pointer;

    ${({level}) => level === "LOWER_LEVEL" && `
        width: 80px;
        height: 80px;
    `}
    ${({level}) => level === "MIDDLE_LEVEL" && `
        width: 60px;
        height: 60px;
    `}
    ${({level}) => level === "HIGH_LEVEL" && `
        width: 45px;
        height: 45px;
    `}
`;

const CorrectIcon = styled.img`
    position: absolute;
`;