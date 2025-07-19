import './App.css'
import RootRouter from "./routers/RootRouter.tsx";
import { Provider } from "react-redux";
import {store} from "./redux/store.ts";

function App() {
    return (
        <Provider store={store}>
            <RootRouter/>
        </Provider>
    )
}

export default App
