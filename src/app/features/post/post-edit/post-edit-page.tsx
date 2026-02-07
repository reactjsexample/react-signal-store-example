// src/app/features/post/post-edit/post-edit-page.tsx

import * as AppStore from "../../../app-store.tsx";
import * as PostStore from "../post-store.ts"
import {useEffect} from "react";
import {useSignals} from "@preact/signals-react/runtime";

function PostEditPage() {
    useEffect(() => {
        AppStore.setSelectedPage('post-edit');
    }, []) // do this once after page is loaded

    useSignals(); // re-render view when signals change

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
                    <form className="bg-[aliceblue] p-4 flex flex-col gap-2">
                        <table>
                            <tbody>
                            <tr>
                                <td>User Id:</td>
                                <td>
                                    <input type="text" name="userid" readOnly
                                           value={PostStore.selectedPost.value?.userId}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Post Id:</td>
                                <td><input type="text" name="id" readOnly
                                           value={PostStore.selectedPost.value?.id}
                                /></td>
                            </tr>
                            <tr>
                                <td>Title:</td>
                                <td>
                                    <input type="text" name="title"
                                           value={PostStore.selectedPost.value?.title}
                                    />
                                    <span className="text-[red]">*</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Body:</td>
                                <td>
                                    <input type="text" name="body"
                                           value={PostStore.selectedPost.value?.body}
                                    />
                                    <span className="text-[red]">*</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                </section>
            )}
        </main>
    );
}

export default PostEditPage;
