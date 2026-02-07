// src/pages/HomePage.jsx
import {useEffect} from 'react';
import {isUserEmpty, isUserError, isUserLoaded, isUserLoading, selectedUserId, showUsers, userData} from "./userStore";


function UserPage() {

    useEffect(() => {
        showUsers();
    }, [])

    return (
        <main>
            <section>
                <h2>Users</h2>
            </section>

            {isUserLoading.value && (
                <p>Loading...</p>
            )}

            {isUserError.value && (
                <p>Error getting data.</p>
            )}

            {isUserEmpty.value && (
                <p>None found.</p>
            )}

            {isUserLoaded.value && (
                <section>
                    <h3>Select a User to see Posts</h3>
                    <table className="xxx-table">
                        <thead>
                        <tr>
                            <th className="xxx-table-cell-header">ID</th>
                            <th className="xxx-table-cell-header">First Name</th>
                            <th className="xxx-table-cell-header">Last Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userData.value.map((user) => (
                            <tr key={user.id} className={`${selectedUserId.value === user.id ? 'active-class' : ''}`}
                            >
                                <td className="xxx-table-cell">{user.id}</td>
                                <td className="xxx-table-cell">{user.firstName}</td>
                                <td className="xxx-table-cell">{user.lastName}</td>
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