import type {Page} from "../../appTypes.tsx";
import {Link} from "react-router";
import "./navBar.css";

type NavBarProps = {
    selectedPage: Page;
}

export function NavBar({selectedPage}: NavBarProps) {
    return (
        <nav>
            <ul className="flex items-center">
                <li className={`${selectedPage === 'home' ? 'active' : ''}`}>
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className={`${selectedPage === 'user' ? 'active' : ''}`}>
                    <Link className="nav-link" to="/user">Users</Link>
                </li>
                <li className={`${selectedPage === 'post' ? 'active' : ''}`}>
                    <Link className="nav-link" to="/post">Posts</Link>
                </li>
                <li className={`${selectedPage === 'post-edit' ? 'active' : ''}`}>
                    <Link className="nav-link" to="/post-edit">Post Edit</Link>
                </li>
            </ul>
        </nav>
    )
}
