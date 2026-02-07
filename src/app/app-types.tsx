export type Page = "home" | "user" | "post" | "post-edit";

export const appInitialState: AppState = {
    selectedPage: "home",
    selectedUserId: undefined,
};

export interface AppState {
    selectedPage: Page;
    selectedUserId: number | undefined;
}
