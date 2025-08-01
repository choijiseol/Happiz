import {BrowserRouter, Route, Routes} from "react-router";
import RootPage from "../pages/root/RootPage.tsx";
import NotFoundPage from "../pages/notFound/NotFoundPage.tsx";
import HomePage from "../pages/home/HomePage.tsx";
import StartPage from "../pages/start/StartPage.tsx";
import GameListPage from "../pages/game/GameListPage.tsx";
import GameGuidPage from "../pages/game/GameGuidPage.tsx";
import StorePage from "../pages/store/StorePage.tsx";

export default function RootRouter() {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<RootPage/>}/>
            <Route path={"/start"} element={<StartPage/>}/>
            <Route path={"/home"} element={<HomePage/>}/>
            <Route path={"/list"} element={<GameListPage/>}/>
            <Route path="/store" element={<StorePage/>} />
            <Route path="/game/:type" element={<GameGuidPage/>} />
            <Route path={"*"} element={<NotFoundPage/>}/>
        </Routes>
    </BrowserRouter>
}