/**
 * userStore is the feature state for the post page.
 */
import {computed, Signal, signal} from '@preact/signals-react';
import type {DropdownOption} from "../../appTypes.tsx";
import {type UserApiResponse, userInitialState, type UserState, type UserType} from "./userTypes.tsx";
import {userDataService} from "./userDataService.ts";

// State
// It is a single data object to store all the properties needed to support the view.
const userState: Signal<UserState> = signal<UserState>(userInitialState);

// Selectors
// A selector is used to read any data from the state.
// In a Signal-based state, it is a function that returns a signal.
// By design, it is the only way to read the state.
export const isUsersError: Signal<boolean> = computed(() => userState.value.isUsersError);
export const isUsersLoading: Signal<boolean> = computed(() => userState.value.isUsersLoading);
export const searchOptions: Signal<DropdownOption[]> = computed(() => userState.value.searchOptions);
export const searchText: Signal<string> = computed(() => userState.value.searchText);
export const selectedSearchOptionValue: Signal<string> = computed(() => userState.value.selectedSearchOptionValue);
export const users: Signal<UserType[]> = computed(() => userState.value.users);

// calculated selectors
export const filteredUsers: Signal<UserType[]> = computed(() => {
    const filteredUsers: UserType[] = [...users.value];
    if (!filteredUsers.length) return [];
    const key: string = selectedSearchOptionValue.value;
    const user: UserType = filteredUsers[0];
    if (Object.hasOwn(user, key) && searchText.value.length > 0) {
        return userState.value.users.filter((user: UserType) => user[key].toLowerCase().includes(searchText.value));
    }
    return filteredUsers;
});

export const isUsersEmpty: Signal<boolean> = computed(() =>  !isUsersLoading.value && !isUsersError.value && filteredUsers.value.length === 0);

export const isUsersLoaded: Signal<boolean> = computed(() => !isUsersLoading.value && !isUsersError.value && filteredUsers.value.length > 0);


// Actions
// An action is a method that will update the state and or change the view or behavior.
const getUsers = (): void => {
    userState.value =
        {
            ...userState.value,
            isUsersError: false,
            isUsersLoading: true,
            users: [],
        };

    try {
        userDataService.getUsers()
            .then((response: UserApiResponse) => {
                userState.value = {
                    ...userState.value,
                    isUsersLoading: false,
                    users: response.users
                };
            });
    } catch (error) {
        console.error(error)
        userState.value =
            {
                ...userState.value,
                isUsersError: true,
                isUsersLoading: false
            };
    }
};

export function setSearchText(text: string): void {
    userState.value = {
        ...userState.value,
        searchText: text.toLowerCase()
    }
}

export function setSelectedSearchOptionValue(selectedValue: string): void {
    userState.value = {
        ...userState.value,
        searchText: "",
        selectedSearchOptionValue: selectedValue
    }
}

export function showUsers(): void {
    if (!isUsersLoaded.value && !isUsersLoading.value) {
        getUsers();
    }
}
