import * as AppStore from "../../appStore.tsx";
import {MessageCard} from "../../shared/message-card/MessageCard.tsx";
import {type NavigateFunction, useNavigate} from "react-router";
import * as PostStore from "./postStore.ts";
import type {PostType} from "./postTypes.ts";
import {useEffect} from "react";
import {useSignals} from "@preact/signals-react/runtime";
import Search from "../../shared/search/Search.tsx";

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

    function handleRowClick(id: string) {
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
            <section className="flex justify-between">
                <h2>Posts</h2>
                <Search
                    dropdownOptions={PostStore.searchOptions.value}
                    onSearchOptionChange={handleSearchOptionChange}
                    onSearchTextChange={handleSearchTextChange}
                    searchText={PostStore.searchText.value}
                    selectedValue={PostStore.selectedSearchOptionValue.value}
                />
            </section>

            {AppStore.isNoSelectedUser.value && (
                <MessageCard variant="info"
                             messageText="There is no selected user. Go to Users page to select."/>
            )}

            {PostStore.isPostsLoading.value && (
                <MessageCard variant="info" messageText="Loading..."/>
            )}

            {PostStore.isPostsError.value && (
                <MessageCard variant="error" messageText="Error in data access"/>
            )}

            {PostStore.isPostsEmpty.value && (
                <MessageCard variant="info" messageText="None found"/>
            )}

            {PostStore.isPostsLoaded.value && (
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
                        {PostStore.filteredPosts.value.map((post: PostType) => (
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
