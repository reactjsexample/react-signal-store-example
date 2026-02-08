export interface PostType {
  body: string;
  id: number;
  title: string;
  userId: number;
}

export const postInitialState: PostState = {
  isError: false,
  isLoading: false,
  newPost: undefined,
  posts: [],
  selectedPostId: undefined,
  postUserId: undefined,
};

export interface PostState {
  isError: boolean;
  isLoading: boolean;
  newPost?: PostType;
  posts: PostType[];
  selectedPostId?: number;
  postUserId?: number;
}
