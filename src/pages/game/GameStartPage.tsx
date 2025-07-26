import {useParams} from "react-router";
import {games} from "../../data/gameData.ts";

export default function GameStartPage(){
    const { type } = useParams();
    const game = games[type as keyof typeof games];
    console.log(game);
    return <>
    </>
}