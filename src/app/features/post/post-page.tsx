// src/app/features/post/post-page.tsx
import {type NavigateFunction, useNavigate} from "react-router";
import * as AppStore from "../../app-store.tsx";
import * as PostStore from "./post-store.ts";
import type {PostType} from "./post-types.ts";
import {useEffect} from "react";
import {useSignals} from "@preact/signals-react/runtime";

function PostPage() {
    useEffect(() => {
        AppStore.setSelectedPage('post');
        PostStore.showPosts(); // get posts list from store, if not yet loaded then get from api
    }, []) // do this once after page is loaded

    useSignals(); // re-render view when signals change

    const navigate: NavigateFunction = useNavigate(); // initialize the navigate function

    function handleRowClick(id: number) {
        PostStore.setSelectedPostId(id);
        navigate("/post-edit");
    }

    return (
        <main>
            <section>
                <h2>Posts</h2>
            </section>

            {AppStore.isNoSelectedUser.value && (
                <>
                    <div>There is no selected user.</div>
                    <div>Go to Users page to select a user.</div>
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

            {PostStore.isLoaded.value && (
                <section>
                    <h3>Select a Post to edit</h3>
                    <p>User Id: {AppStore.selectedUserId.value}</p>
                    <table className="data-table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Body</th>
                        </tr>
                        </thead>
                        <tbody>
                        {PostStore.posts.value.map((post: PostType) => (
                            <tr
                                key={post.id}
                                className={`${PostStore.selectedPost.value?.id === post.id ? 'active' : ''}`}
                                onClick={() => handleRowClick(post.id)}
                            >
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.body}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            )}
        </main>
    );
}

export default PostPage;
