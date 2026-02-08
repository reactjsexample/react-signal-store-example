import * as AppStore from "../../appStore.tsx";
import {NavBar} from "../nav-bar/NavBar.tsx";
import {useSignals} from "@preact/signals-react/runtime";

function Header() {
    useSignals(); // re-render view when signals change
    
    return (
        <div className={"items-center bg-[aquamarine] flex flex-col w-full p-4 gap-4"}>
            <div>
                <h1 className="text-4xl font-bold">react-signal-store-example</h1>
            </div>
            <NavBar selectedPage={AppStore.selectedPage.value} />
        </div>
    )
}

export default Header;
