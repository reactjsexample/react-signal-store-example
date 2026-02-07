// src/pages/HomePage.jsx
import * as UserStore from "./user-store.tsx";
import {type NavigateFunction, useNavigate} from "react-router";
import * as AppStore from "../../app-store.tsx";
import {useEffect} from 'react';
import type {UserType} from "./user-types.tsx";
import {useSignals} from "@preact/signals-react/runtime";

function UserPage() {
    useEffect(() => {
        AppStore.setSelectedPage('user');
        UserStore.showUsers(); // get users list from store, if not yet loaded then get from api
    }, []) // do this once after page is loaded

    useSignals(); // re-render view when signals change

    const navigate: NavigateFunction = useNavigate(); // initialize the navigate function

    const handleRowClick = (userId: number) => {
        // navigate to the user details page
        AppStore.setSelectedUserId(userId);
        navigate("/post");
    };

    return (
        <main>
            <section>
                <h2>Users</h2>
            </section>

            {UserStore.isUsersLoading.value && (
                <p>Loading...</p>
            )}

            {UserStore.isUsersError.value && (
                <p>Error getting data.</p>
            )}

            {UserStore.isUsersEmpty.value && (
                <p>None found.</p>
            )}

            {UserStore.isUsersLoaded.value && (
                <section>
                    <h3>Select a User to see Posts</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {UserStore.users.value.map((user: UserType) => (
                            <tr
                                key={user.id}
                                className={`${AppStore.selectedUserId.value === user.id ? 'active' : ''}`}
                                onClick={() => handleRowClick(user.id)}
                            >
                                <td>{user.id}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            )}
        </main>
    )
}

export default UserPage;