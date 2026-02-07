import {Link} from "react-router";

function MyHeader() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/user">Users</Link>
                    </li>
                    <li>
                        <Link to="/post">Posts</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default MyHeader;
