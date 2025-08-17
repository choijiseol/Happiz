import Flex from "../../common/components/Flex.tsx";
import Header from "../../common/components/Header.tsx";
import {useParams} from "react-router";
import ColorGamePage from "./ColorGamePage.tsx";
import PictureGamePage from "./PictureGamePage.tsx";
import TimeGamePage from "./TimeGamePage.tsx";
import PressGamePage from "./PressGamePage.tsx";
import PuzzleGamePage from "./PuzzleGamePage.tsx";
import GagGamePage from "./GagGamePage.tsx";

export default function GamePage() {
    const {type} = useParams();

    return <Flex width={"100%"} height={"100%"} style={{backgroundColor: "#A0E9FF"}}>
        <Header hasBefore isGame/>
        { type === "color" && <ColorGamePage/>}
        { type === "picture" && <PictureGamePage/>}
        { type === "time" && <TimeGamePage/>}
        { type === "gag" && <GagGamePage/>}
        { type === "press" && <PressGamePage/>}
        { type === "puzzle" && <PuzzleGamePage/>}
    </Flex>
}
