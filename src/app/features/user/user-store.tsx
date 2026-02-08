import {computed, Signal, signal} from '@preact/signals-react';
import {type UserApiResponse, userInitialState, type UserState, type UserType} from "./user-types.tsx";
import {userDataService} from "./user-data-service.ts";

// State
// It is a single data object to store all the properties needed to support the view.
const userState: Signal<UserState> = signal<UserState>(userInitialState);

// Selectors
// A selector is used to read any data from the state.
// In a Signal-based state, it is a function that returns a signal.
// By design, it is the only way to read the state.
export const isUsersError: Signal<boolean> = computed(() => userState.value.isUsersError);
export const isUsersLoading: Signal<boolean> = computed(() => userState.value.isUsersLoading);
export const users: Signal<UserType[]> = computed(() => userState.value.users);

// calculated selectors
export const isUsersLoaded: Signal<boolean> = computed(() => !isUsersLoading.value && users.value.length > 0);
export const isUsersEmpty: Signal<boolean> = computed(() => !isUsersLoading.value && users.value.length === 0);


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

export function showUsers(): void {
    if (!isUsersLoaded.value && !isUsersLoading.value) {
        getUsers();
    }
}
