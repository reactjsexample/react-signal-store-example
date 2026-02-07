import {Signal, signal} from '@preact/signals-react';
import type {UserApiResponse, UserType} from "./userTypes";
import {userDataService} from "./userDataService";

export const isUserError: Signal<boolean> = signal(false);
export const isUserLoading: Signal<boolean> = signal(false);
export const selectedUserId: Signal<number | null> = signal(null);
export const userData: Signal<UserType[]> = signal<UserType[]>([]);

// calculated selectors
export const isUserEmpty: Signal<boolean> = signal(!isUserLoading.value && userData.value.length === 0)
export const isUserLoaded: Signal<boolean> = signal(!isUserLoading.value && userData.value.length > 0)

const getUsers = (): void => {
    try {
        selectedUserId.value = null;
        isUserEmpty.value = false;
        isUserError.value = false;
        isUserLoading.value = true;
        userDataService.getUsers()
            .then((response: UserApiResponse) => {
                userData.value = response.users;
            });
    } catch (error) {
        console.error(error)
        isUserError.value = true;
    } finally {
        isUserLoading.value = false;
    }
};

export function showUsers(): void {
    if (isUserEmpty.value) {
        getUsers();
    }
}
