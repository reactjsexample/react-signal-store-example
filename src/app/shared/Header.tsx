import {Link} from "react-router";

function MyHeader() {
    return (
        <div className={"items-center bg-[aquamarine] flex w-full p-4 gap-4"}>
            <div>
            <h1 className="text-4xl font-bold">react-signal-store-example</h1>
            </div>
            <div>
            <nav className="flex flex-col items-center">
                <ul>
                    <li>
                        <Link className="p-2" to="/">Home</Link>
                    </li>
                    <li>
                        <Link className="p-2" to="/user">Users</Link>
                    </li>
                    <li>
                        <Link className="p-2" to="/post">Posts</Link>
                    </li>
                </ul>
            </nav>
            </div>
        </div>
    )
}

export default MyHeader;
