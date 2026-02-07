import {Link} from "react-router";
import * as AppStore from "../app-store.tsx";
import {useSignals} from "@preact/signals-react/runtime";

function MyHeader() {
    useSignals(); // re-render view when signals change

    return (
        <div className={"items-center bg-[aquamarine] flex w-full p-4 gap-4"}>
            <div>
            <h1 className="text-4xl font-bold">react-signal-store-example</h1>
            </div>
            <div>
            <nav className="flex flex-col items-center">
                <ul>
                    <li className={`${AppStore.selectedPage.value === 'home' ? 'active' : ''}`}>
                        <Link className="p-2" to="/">Home</Link>
                    </li>
                    <li className={`${AppStore.selectedPage.value === 'user' ? 'active' : ''}`}>
                    <Link className="p-2" to="/user">Users</Link>
                    </li>
                    <li className={`${AppStore.selectedPage.value === 'post' ? 'active' : ''}`}>
                    <Link className="p-2" to="/post">Posts</Link>
                    </li>
                </ul>
            </nav>
            </div>
        </div>
    )
}

export default MyHeader;
