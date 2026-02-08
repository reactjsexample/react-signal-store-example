import type {DropdownOption} from "../../appTypes.tsx";

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

const userInitialSearchDropdownOptions: DropdownOption[] = [
    {
        label: "First Name",
        value: "firstname",
    },
    {
        label: "Last Name",
        value: "lastname",
    }
];

export const userInitialState: UserState = {
    isUsersError: false,
    isUsersLoading: false,
    searchOptions: userInitialSearchDropdownOptions,
    searchText: "",
    selectedSearchOptionValue: "lastname",
    users: []
};

export interface UserState {
    isUsersError: boolean;
    isUsersLoading: boolean;
    searchOptions: DropdownOption[];
    searchText: string;
    selectedSearchOptionValue: string;
    users: UserType[];
}
