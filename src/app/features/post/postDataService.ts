// postDataService.ts
import type {PostType} from "./postTypes.ts";

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export const postDataService = {
  getPosts: async (userId: number): Promise<PostType[]> => {
    const postUrl = `${BASE_URL}?userId=${userId}`;
    const response = await fetch(postUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  },

  updatePost: async (post: PostType): Promise<PostType> => {
    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    };
    const postUrl = `${BASE_URL}/${post.id}`;
    const response = await fetch(postUrl, requestOptions);
    if (!response.ok) {
      throw new Error('Failed to update post');
    }
    return response.json();
  }
};
