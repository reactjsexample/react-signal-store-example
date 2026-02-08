import {appInitialState, type AppState, type Page} from "./appTypes.tsx";
import {computed, Signal, signal} from '@preact/signals-react';

// State
// It is a single data object to store all the properties needed to support the view.
const appState: Signal<AppState> = signal<AppState>(appInitialState);

// Selectors
// A selector is used to read any data from the state.
// In a Signal-based state, it is a function that returns a signal.
// By design, it is the only way to read the state.

// state selectors
export const selectedPage: Signal<Page> = computed(() => appState.value.selectedPage);

// calculated selectors
export const selectedUserId: Signal<number | undefined> = computed(() => appState.value.selectedUserId ? appState.value.selectedUserId : undefined);
export const isNoSelectedUser: Signal<boolean> = computed(() => selectedUserId.value === undefined);

// Actions
// An action is a method that will update the state and or change the view or behavior.

export function setSelectedPage(page: Page): void {
    appState.value =
        {
            ...appState.value,
            selectedPage: page
        };
}

export function setSelectedUserId(userId: number): void {
    appState.value =
        {
            ...appState.value,
            selectedUserId: userId
        };
}
