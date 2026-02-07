// src/app/features/post/post-edit/post-edit-page.tsx

import * as AppStore from "../../../app-store.tsx";
import * as PostStore from "../post-store.ts"
import {useEffect} from "react";
import {useSignals} from "@preact/signals-react/runtime";
import type {PostType} from "../post-types.ts";

function PostEditPage() {
    useEffect(() => {
        AppStore.setSelectedPage('post-edit');
    }, []) // do this once after page is loaded

    useSignals(); // re-render view when signals change

    const handleChange = (event: { target: { name: string; value: string; }; }) => {
        const {name, value} = event.target;
        if (PostStore.selectedPost.value) {
            const post: PostType = {
                ...PostStore.selectedPost.value,
                [name]: value,
            }
            PostStore.setNewPost(post);
        }
    };

    return (
        <main>
            <section>
                <h2>Post Edit</h2>
            </section>

            {AppStore.isNoSelectedUser.value && (
                <>
                    <div>There is no selected user.</div>
                    <div>Go to Users page to select a user.</div>
                </>
            )}

            {PostStore.isNoSelectedPost.value && (
                <>
                    <div>There is no selected post.</div>
                    <div>Go to Posts page to select a post.</div>
                </>
            )}

            {PostStore.isLoading.value && (
                <p>Loading...</p>
            )}

            {PostStore.isError.value && (
                <p>Error getting data.</p>
            )}

            {PostStore.isEmpty.value && (
                <p>None found.</p>
            )}

            {PostStore.isSelectedPost.value && (
                <section>
                    <h3>Post Edit</h3>
                    <div>
                        <form className="form-grid-container">
                            <label htmlFor="userid">User Id:</label>
                            <input type="text" name="userid" id="userid" readOnly
                                   value={PostStore.newPost.value?.userId}
                            />

                            <label htmlFor="postid">Post Id:</label>
                            <input type="text" name="id" id="postid" readOnly
                                   value={PostStore.newPost.value?.id}
                            />

                            <label htmlFor="title">
                                <span className="required">*</span>
                                <span>Title:</span>
                            </label>
                            <input type="text" name="title" id="title"
                                   value={PostStore.newPost.value?.title}
                                   onChange={handleChange}/>

                            <label>
                                <span className="required">*</span>
                                <span>Body:</span>
                            </label>
                            <textarea
                                id="post-body" // Link the label to the textarea for accessibility
                                value={PostStore.newPost.value?.body} // The value is controlled by the React signal state
                                name="body"
                                onChange={handleChange}
                                rows={5} // Specify the number of visible rows
                                cols={30} // Specify the number of visible columns
                            />
                        </form>
                    </div>
                </section>
            )}
        </main>
    );
}

export default PostEditPage;
