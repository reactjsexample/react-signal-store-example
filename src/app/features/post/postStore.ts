/**
 * postStore is the feature state for the post page.
 */
import * as AppStore from "../../appStore.tsx";
import {computed, signal, type Signal} from "@preact/signals-react";
import type {DropdownOption} from "../../appTypes.tsx";
import {postDataService} from "./postDataService.ts";
import {postInitialState, type PostState, type PostType} from "./postTypes.ts";

// State
// It is a single data object to store all the properties needed to support the view.
const postState: Signal<PostState> = signal<PostState>(postInitialState);

// Selectors
// A selector is used to read any data from the state.
// In a Signal-based state, it is a function that returns a signal.
// By design, it is the only way to read the state.

// state selectors
export const isPostSaveError: Signal<boolean> = computed(()=> postState.value.isPostSaveError);
export const isPostSaveLoading: Signal<boolean> = computed(()=> postState.value.isPostSaveLoading);
export const isPostsError: Signal<boolean> = computed(() => postState.value.isPostsError);
export const isPostsLoading: Signal<boolean> = computed(() => postState.value.isPostsLoading);
export const newPost: Signal<PostType | undefined> = computed(() => postState.value.newPost);
export const posts: Signal<PostType[]> = computed(() => postState.value.posts);
export const postUserId: Signal<string | undefined> = computed(() => postState.value.postUserId);
export const searchOptions: Signal<DropdownOption[]> = computed(() => postState.value.searchOptions);
export const searchText: Signal<string> = computed(() => postState.value.searchText);
export const selectedPostId: Signal<string | undefined> = computed(() => postState.value.selectedPostId);
export const selectedSearchOptionValue: Signal<string> = computed(() => postState.value.selectedSearchOptionValue);

// calculated selectors
export const filteredPosts: Signal<PostType[]> = computed(() => {
    let theFilteredPosts: PostType[] = [...posts.value];
    if (!theFilteredPosts.length) return [];
    const key: string = selectedSearchOptionValue.value;
    const post: PostType = theFilteredPosts[0];
    if (Object.hasOwn(post, key) && searchText.value.length > 0) {
        theFilteredPosts = postState.value.posts.filter((post: PostType) => post[key].toLowerCase().includes(searchText.value));
    }
    return theFilteredPosts;
});

export const isPostsEmpty: Signal<boolean> = computed(() =>
    !AppStore.isNoSelectedUser.value
    && (!isPostsLoading.value
    && !isPostsError.value
    && filteredPosts.value.length === 0));

export const isNoSelectedPost: Signal<boolean> = computed(() =>
    !AppStore.isNoSelectedUser.value
    && selectedPostId.value === undefined);

export const isPostsLoaded: Signal<boolean> = computed(() =>
    !AppStore.isNoSelectedUser.value
    && !isPostsLoading.value
    && !isPostsError.value
    && filteredPosts.value.length > 0);

export const selectedPost: Signal<PostType | undefined> = computed(() => {
    if(isNoSelectedPost.value) return undefined;
    return posts.value.find(post => post.id === selectedPostId.value)
});

export const isPostFormValid: Signal<boolean> = computed(()=>{
    let isValid = true;
    isValid = isValid &&
        newPost.value !== undefined &&
        newPost.value.title !== undefined &&
        newPost.value.title.length > 0;
    isValid = isValid &&
        newPost.value !== undefined &&
        newPost.value.body !== undefined &&
        newPost.value.body.length > 0;
    return isValid;
})

export const isSaveButtonDisabled: Signal<boolean> = computed(() => (
        !isPostsLoaded.value
        || selectedPost.value === undefined
        || newPost.value === undefined
        || isPostsEqual(newPost.value, selectedPost.value))
    || !isPostFormValid.value
);

export const isSelectedPost: Signal<boolean> = computed(() => selectedPost.value !== undefined);

// helper functions
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
    if (AppStore.selectedUserId.value === undefined) return;
    postState.value = (
        ({
            ...postState.value,
            isPostsError: false,
            isPostsLoading: true,
            posts: [],
            postUserId: AppStore.selectedUserId.value,
            selectedPostId: undefined,
        })
    );

    try {
        postDataService.getPosts(AppStore.selectedUserId.value)
            .then((posts: PostType[]) => {
                postState.value =
                    ({
                        ...postState.value,
                        isPostsError: false,
                        isPostsLoading: false,
                        posts
                    });
            })
    } catch (error) {
        console.error(error);
        postState.value =
            ({
                ...postState.value,
                isPostsError: true,
                isPostsLoading: false,
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

export function setSearchText(text: string): void {
    postState.value = {
        ...postState.value,
        searchText: text
    }
}

export const setSelectedPostId = (postId: string) => {
    // make sure the post exists
    if (postState.value.posts.some(item => item.id === postId)) {
        // Get the selected post.
        // set the newPost which holds the state of the form data
        const newPost: PostType | undefined = posts.value.find(post => post.id === postId);
        postState.value =
            ({
                ...postState.value,
                newPost,
                selectedPostId: postId
            })
    }
}

export function setSelectedSearchOptionValue(selectedValue: string): void {
    postState.value = {
        ...postState.value,
        searchText: "",
        selectedSearchOptionValue: selectedValue
    }
}

export const showPosts = (): void => {
    if (AppStore.selectedUserId.value !== undefined) {
        if (!isPostsLoading.value && (!isPostsLoaded.value || postUserId.value !== AppStore.selectedUserId.value)) {
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
        isPostSaveError: false,
        isPostSaveLoading: true,
    };

    try {
        postDataService.updatePost(post)
            .then(() => {
                // the mock api does not actually do any PUT, POST, or DELETE
                // so we mock the changes to the state to include the expected change for a real API
                // remove the old post
                let posts: PostType[] = postState.value.posts.filter(item => item.id !== post.id);
                // add the new post
                const updatedPost: PostType = {...post};
                posts.push(updatedPost);
                // sort posts by id
                posts = [...posts].sort((a, b) => {
                    return (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0;
                });
                postState.value =
                    {
                        ...postState.value,
                        isPostSaveLoading: false,
                        posts
                    };
            })
    } catch (error) {
        console.error(error);
        postState.value =
            ({
                ...postState.value,
                isPostSaveError: true,
                isPostSaveLoading: false,
            });
    }

}

export function onSetSelectedUserId(): void {
    postState.value =
        ({
            ...postState.value,
            newPost: undefined,
            postUserId: undefined,
            searchText: "",
            selectedPostId: undefined,
        });
}
