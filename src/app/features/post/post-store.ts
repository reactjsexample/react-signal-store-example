/**
 * PostStore is the feature state for the post page.
 */
import * as AppStore from "../../app-store.tsx";
import {computed, signal, type Signal} from "@preact/signals-react";
import {postDataService} from "./post-data-service.ts";
import {postInitialState, type PostState, type PostType} from "./post-types.ts";
import {selectedUserId} from "../../app-store.tsx";

// State
// It is a single data object to store all the properties needed to support the view.
const postState: Signal<PostState> = signal<PostState>(postInitialState);

// Selectors
// A selector is used to read any data from the state.
// In a Signal-based state, it is a function that returns a signal.
// By design, it is the only way to read the state.
// This version does not use the prefix "select" in the name of the selector.

export const isEmpty: Signal<boolean> = computed(() => !postState.value.isLoading && postState.value.posts.length === 0);
export const isError: Signal<boolean> = computed(() => postState.value.isError);
export const isLoaded: Signal<boolean> = computed(() => postState.value.posts.length > 0);
export const isLoading: Signal<boolean> = computed(() => postState.value.isLoading);
export const isNoSelectedPost: Signal<boolean> = computed(() => postState.value.selectedPostId === undefined ||
    !postState.value.isLoading && postState.value.posts.length === 0);
export const newPost: Signal<PostType | undefined> = computed(() => postState.value.newPost);
export const posts: Signal<PostType[]> = computed(() => postState.value.posts);
export const postUserId: Signal<number | undefined> = computed(() => postState.value.postUserId);
export const selectedPostId: Signal<number | undefined> = computed(() => postState.value.selectedPostId);

export const selectedPost: Signal<PostType | undefined> = computed(() => {
    let post: PostType | undefined;
    const thePosts: PostType[] = posts.value;
    const postId: number | undefined = selectedPostId.value;
    if (postId !== undefined && thePosts.length > 0) {
        post = thePosts.find(item => item.id === postId);
    }
    return post;
});

export const isSaveButtonDisabled: Signal<boolean> = computed(() => (
    !isLoaded.value
    || selectedPost.value === undefined
    || newPost.value === undefined
    || isPostsEqual(newPost.value, selectedPost.value))
);

function isPostsEqual(post1: PostType | undefined, post2: PostType | undefined): boolean {
    if (!post1 || !post2) {
        return false;
    }
    return (post1.id === post2.id
        && post1.userId === post2.userId
        && post1.body === post2.body
        && post1.title === post2.title);
}

// Actions
// An action is a method that will update the state and or change the view or behavior.
const getPosts = () => {
    if (selectedUserId.value === undefined) return;
    postState.value = (
        ({
            ...postState.value,
            isError: false,
            isLoading: true,
            posts: [],
            postUserId: selectedUserId.value,
            selectedPostId: undefined,
        })
    );

    try {
        postDataService.getPosts(selectedUserId.value)
            .then((posts: PostType[]) => {
                postState.value =
                    ({
                        ...postState.value,
                        isError: false,
                        isLoading: false,
                        posts
                    });
            })
    } catch (error) {
        console.error(error);
        postState.value =
            ({
                ...postState.value,
                isError: true,
                isLoading: false,
                postUserId: undefined,
            });
    }
}

export const setNewPost = (post: PostType) => {
    // Create a new object for immutability
    const newPost: PostType = JSON.parse(JSON.stringify(post));
    postState.value =
        ({
            ...postState.value,
            newPost
        });
}

export const setSelectedPostId = (postId: number) => {
    // make sure the post exists
    if (postState.value.posts.some(item => item.id === postId)) {
        postState.value =
            ({
                ...postState.value,
                newPost: undefined,
                selectedPostId: postId
            })
    }
}

export const showPosts = (): void => {
    if (AppStore.selectedUserId.value !== undefined) {
        if (!isLoading.value && (!isLoaded.value || postUserId.value !== AppStore.selectedUserId.value)) {
            getPosts();
        }
    }
}

export const updatePost = (): void => {
    const post: PostType | undefined = newPost.value;
    if (post === undefined) {
        //unexpected error, post should not be undefined
        console.error("updatePost. No post found.");
        return;
    }

    postState.value = {
        ...postState.value,
        isError: false,
        isLoading: true,
    };

    try {
        postDataService.updatePost(post)
            .then((response) => {
                console.log(response);
                // remove the old post
                const posts = postState.value.posts.filter(item => item.id !== post.id);
                // add the new post
                const updatedPost: PostType = {...post};
                posts.push(updatedPost);
                // sort posts by id
                posts.sort((a: PostType, b: PostType) => a.id - b.id);
                postState.value =
                    {
                        ...postState.value,
                        isLoading: false,
                        posts
                    };
            })
    } catch (error) {
        console.error(error);
        postState.value =
            ({
                ...postState.value,
                isError: true,
                isLoading: false,
            });
    }
}
