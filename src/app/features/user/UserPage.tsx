// src/pages/HomePage.jsx
import {
    isUsersEmpty,
    isUsersError,
    isUsersLoaded,
    isUsersLoading,
    selectedUserId,
    setSelectedUserId,
    showUsers,
    users
} from "./userStore";
import type {UserType} from "./userTypes.tsx";
import {useEffect} from 'react';
import {type NavigateFunction, useNavigate} from "react-router";
import {useSignals} from "@preact/signals-react/runtime";

function UserPage() {
    useEffect(() => {
        showUsers(); // get users list from store, if not yet loaded then get from api
    }, []) // do this once after page is loaded

    useSignals(); // re-render view when signals change

    const navigate: NavigateFunction = useNavigate(); // initialize the navigate function

    const handleRowClick = (userId: number) => {
        // navigate to the user details page
        setSelectedUserId(userId);
        navigate(`/posts/${userId.toString()}`);
    };

    return (
        <main>
            <section>
                <h2>Users</h2>
            </section>

            {isUsersLoading.value && (
                <p>Loading...</p>
            )}

            {isUsersError.value && (
                <p>Error getting data.</p>
            )}

            {isUsersEmpty.value && (
                <p>None found.</p>
            )}

            {isUsersLoaded.value && (
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
                        {users.value.map((user: UserType) => (
                            <tr key={user.id} className={`${selectedUserId.value === user.id ? 'active' : ''}`}
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