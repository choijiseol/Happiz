import Flex from "../../common/components/Flex.tsx";
import styled from "styled-components";
import GameLevelText from "./components/GameLevelText.tsx";
import {useState, useEffect, useMemo} from "react";
import GameTimer from "./components/GameTimer.tsx";
import ReadyModal from "./components/ReadyModal.tsx";
import {colorData} from "./data/ColorData.ts";
import FinichModal from "./components/FinishModal.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../redux/store.ts";

export default function ColorGamePage() {
    const colorLevel = useSelector((state: RootState) => state.game.colorLevel);

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
        if (colorLevel <= 4) return colorData.find(d => d.level === "LOWER_LEVEL")!;
        if (colorLevel <= 8) return colorData.find(d => d.level === "MIDDLE_LEVEL")!;
        return colorData.find(d => d.level === "HIGH_LEVEL")!;
    }, [colorLevel]);

    const randomColorPair = useMemo(() => {
        if (isClear !== "PLAY") return {main: "#979797", diff: "#979797"}
        const pair = levelData.color[Math.floor(Math.random() * levelData.color.length)];
        return Math.random() > 0.5
            ? {main: pair.color1, diff: pair.color2}
            : {main: pair.color2, diff: pair.color1};
    }, [levelData, isClear]);

    const {gridColors, diffIndexes} = useMemo(() => {
        const arr = Array(levelData.columnsNumber).fill(randomColorPair.main);
        const diffs: number[] = [];

        while (diffs.length < levelData.defaultColor) {
            const idx = Math.floor(Math.random() * levelData.columnsNumber);
            if (!diffs.includes(idx)) diffs.push(idx);
        }
        diffs.forEach(idx => {
            arr[idx] = randomColorPair.diff;
        });

        return {gridColors: arr, diffIndexes: diffs};
    }, [levelData, randomColorPair, isClear]);

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
            <FinichModal fall={isClear === "FALL" || end} clear={isClear === "CLEAR" && !end}
                         gameFinish={isClear === "CLEAR" && colorLevel === 10} setStart={setStart}
                         setIsClear={setIsClear} levelCoin={levelData.coin}/>}
        <Flex gap={15} center>
            <GameLevelText level={colorLevel}/>
            <GameTimer
                timer={levelData.timer}
                start={start}
                stop={isClear !== "PLAY"}
                setEnd={setEnd}
            />
        </Flex>
        <GamePlayWrapper gap={10} center level={levelData.level}>
            {gridColors.map((color, i) => (
                <ColorBlock key={i} center color={color} level={levelData.level} onClick={() => handleClick(i)}>
                    {foundDiffs.includes(i) && <img src={"/assets/img/icon/correct.svg"} width={50} alt={"정답"}/>}
                    {wrongIndex === i && <img src={"/assets/img/icon/fall.svg"} width={50} alt={"오답"}/>}
                </ColorBlock>
            ))}
        </GamePlayWrapper>
    </Flex>
}

const GamePlayWrapper = styled(Flex)<{ level: string }>`
    width: 280px;
    height: 430px;
    padding: 35px 20px;
    border-radius: 20px;
    background-color: #FFFFFF;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-start;
    gap: 10px;

    ${({level}) => level === "LOWER_LEVEL" && `
        flex-direction: column;
        align-items: center;
    `}

    ${({level}) => level === "MIDDLE_LEVEL" && `
        flex-direction: row;
    `}

    ${({level}) => level === "HIGH_LEVEL" && `
        flex-direction: row;
    `}
`;

const ColorBlock = styled(Flex)<{ color: string; level: string }>`
    background-color: ${({color}) => color};
    cursor: pointer;

    ${({level}) => level === "LOWER_LEVEL" && `
        width: 280px;
        height: 100px;
    `}
    ${({level}) => level === "MIDDLE_LEVEL" && `
        width: 135px;
        height: 100px;
    `}
    ${({level}) => level === "HIGH_LEVEL" && `
        width: 62px;
        height: 100px;
    `}
`;

