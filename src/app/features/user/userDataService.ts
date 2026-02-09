// userDataService.ts
import type {UserApiResponse} from "./userTypes.tsx";

const BASE_URL = 'https://dummyjson.com/users';

export const userDataService = {
    getUsers: async (): Promise<UserApiResponse> => {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return response.json();
    },
};
