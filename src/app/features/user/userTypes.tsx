export interface UserType {
    firstName: string;
    id: number;
    lastName: string;
}

// Actual api user object has manu more fields but we require a smaller set
export interface UserApiResponse {
    limit: number;
    skip: number;
    total: number;
    users: UserType[];
}

export const userInitialState: UserState = {
    isUsersError: false,
    isUsersLoading: false,
    selectedUserId: undefined,
    users: []
};

export interface UserState {
    isUsersError: boolean;
    isUsersLoading: boolean;
    selectedUserId: number | undefined;
    users: UserType[];
}
