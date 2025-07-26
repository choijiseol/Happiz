import {BrowserRouter, Route, Routes} from "react-router";
import RootPage from "../pages/root/RootPage.tsx";
import NotFoundPage from "../pages/notFound/NotFoundPage.tsx";
import HomePage from "../pages/home/HomePage.tsx";
import StartPage from "../pages/start/StartPage.tsx";
import GameListPage from "../pages/game/GameListPage.tsx";
import GameStartPage from "../pages/game/GameStartPage.tsx";

export default function RootRouter() {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<RootPage/>}/>
            <Route path={"/start"} element={<StartPage/>}/>
            <Route path={"/home"} element={<HomePage/>}/>
            <Route path={"/list"} element={<GameListPage/>}/>
            <Route path="/game/:type" element={<GameStartPage/>} />
            <Route path={"*"} element={<NotFoundPage/>}/>
        </Routes>
    </BrowserRouter>
}