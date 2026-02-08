import * as AppStore from "../../appStore.tsx";
import {type NavigateFunction, useNavigate} from "react-router";
import {useEffect} from 'react';
import * as UserStore from "./userStore.tsx";
import type {UserType} from "./userTypes.tsx";
import {useSignals} from "@preact/signals-react/runtime";
import Search from "../../shared/Search.tsx";

/**
 * UserPage is the Users page
 * @constructor useSignals connects to any referenced Signal Store
 */
function UserPage() {
    useEffect(() => {
        AppStore.setSelectedPage('user');
        UserStore.showUsers(); // get users list from store, if not yet loaded then get from api
    }, []) // do this once after page is loaded

    useSignals(); // re-render view when signals change

    const navigate: NavigateFunction = useNavigate(); // initialize the navigate function

    const handleRowClick = (userId: string) => {
        // navigate to the user details page
        AppStore.setSelectedUserId(userId);
        navigate("/post");
    };

    function handleSearchOptionChange(event: { target: { value: string; }; }) {
        const value: string = event.target.value;
        UserStore.setSelectedSearchOptionValue(value);
    }

    function handleSearchTextChange(event: { target: { value: string; }; }) {
        const value: string = event.target.value;
        UserStore.setSearchText(value);
    }

    return (
        <main>
            <section className="flex justify-between">
                <h2>Users</h2>
                <Search
                    dropdownOptions={UserStore.searchOptions.value}
                    onSearchOptionChange={handleSearchOptionChange}
                    onSearchTextChange={handleSearchTextChange}
                    searchText={UserStore.searchText.value}
                    selectedValue={UserStore.selectedSearchOptionValue.value}
                />
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
                    <table className="data-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {UserStore.filteredUsers.value.map((user: UserType) => (
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