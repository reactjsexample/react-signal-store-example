import type {DropdownOption} from "../../appTypes.tsx";

export interface PostType {
  [key: string]: string; // Allows any string key
  body: string;
  id: string;
  title: string;
  userId: string;
}

const postInitialSearchDropdownOptions: DropdownOption[] = [
  {
    label: "Title",
    value: "title",
  },
  {
    label: "Body",
    value: "body",
  }
];

export const postInitialState: PostState = {
  isPostsError: false,
  isPostsLoading: false,
  isPostSaveError: false,
  isPostSaveLoading: false,
  newPost: undefined,
  posts: [],
  searchOptions: postInitialSearchDropdownOptions,
  searchText: "",
  selectedPostId: undefined,
  selectedSearchOptionValue: "title",
  postUserId: undefined,
};

export interface PostState {
  isPostsError: boolean;
  isPostsLoading: boolean;
  isPostSaveError: boolean;
  isPostSaveLoading: boolean;
  newPost?: PostType;
  posts: PostType[];
  searchOptions: DropdownOption[];
  searchText: string;
  selectedPostId?: string;
  selectedSearchOptionValue: string;
  postUserId?: string;
}
