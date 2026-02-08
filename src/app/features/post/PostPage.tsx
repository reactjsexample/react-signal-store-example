import * as AppStore from "../../appStore.tsx";
import {type NavigateFunction, useNavigate} from "react-router";
import * as PostStore from "./postStore.ts";
import type {PostType} from "./postTypes.ts";
import {useEffect} from "react";
import {useSignals} from "@preact/signals-react/runtime";
import Search from "../../shared/Search.tsx";

/**
 * PostPage is the Posts page
 * @constructor useSignals connects to any referenced Signal Store
 */
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

    function handleSearchOptionChange(event: { target: { value: string; }; }) {
        const value: string = event.target.value;
        PostStore.setSelectedSearchOptionValue(value);
    }

    function handleSearchTextChange(event: { target: { value: string; }; }) {
        const value: string = event.target.value;
        PostStore.setSearchText(value);
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
                    <div className="ml-auto ml-auto">
                        <Search
                            dropdownOptions={PostStore.searchOptions.value}
                            onSearchOptionChange={handleSearchOptionChange}
                            onSearchTextChange={handleSearchTextChange}
                            searchText={PostStore.searchText.value}
                            selectedValue={PostStore.selectedSearchOptionValue.value}
                        />
                    </div>
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
