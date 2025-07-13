import {BrowserRouter, Route, Routes} from "react-router";
import RootPage from "../pages/root/RootPage.tsx";
import NotFoundPage from "../pages/notFound/NotFoundPage.tsx";
import HomePage from "../pages/home/HomePage.tsx";

export default function RootRouter() {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<RootPage/>}/>
            <Route path={"/home"} element={<HomePage/>}/>
            <Route path={"*"} element={<NotFoundPage/>}/>
        </Routes>
    </BrowserRouter>
}