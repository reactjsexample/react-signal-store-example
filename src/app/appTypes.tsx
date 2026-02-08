export type Page = "home" | "user" | "post" | "post-edit";

export type DropdownOption = {
    label: string;
    value: string;
}

export const appInitialState: AppState = {
    selectedPage: "home",
    selectedUserId: undefined,
};

export interface AppState {
    selectedPage: Page;
    selectedUserId: number | undefined;
}
