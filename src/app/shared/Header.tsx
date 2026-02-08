import * as AppStore from "../appStore.tsx";
import {Link} from "react-router";
import {useSignals} from "@preact/signals-react/runtime";

function Header() {
    useSignals(); // re-render view when signals change
    
    return (
        <div className={"items-center bg-[aquamarine] flex flex-col w-full p-4 gap-4"}>
            <div>
                <h1 className="text-4xl font-bold">react-signal-store-example</h1>
            </div>
            <div>
                <nav>
                    <ul className="flex items-center">
                        <li className={`${AppStore.selectedPage.value === 'home' ? 'active' : ''}`}>
                            <Link className="p-2" to="/">Home</Link>
                        </li>
                        <li className={`${AppStore.selectedPage.value === 'user' ? 'active' : ''}`}>
                            <Link className="p-2" to="/user">Users</Link>
                        </li>
                        <li className={`${AppStore.selectedPage.value === 'post' ? 'active' : ''}`}>
                            <Link className="p-2" to="/post">Posts</Link>
                        </li>
                        <li className={`${AppStore.selectedPage.value === 'post-edit' ? 'active' : ''}`}>
                            <Link className="p-2" to="/post-edit">Post Edit</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Header;
