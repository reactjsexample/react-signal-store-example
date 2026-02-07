import './App.css';
import {Route, Routes} from "react-router";
import MyHeader from "./app/shared/Header";
import HomePage from "./app/features/home/HomePage";
import UserPage from "./app/features/user/UserPage";
import PostPage from "./app/features/post/PostPage";
import PostEditPage from "./app/features/post/post-edit/PostEditPage.tsx";

function App() {

    return (
        <div>
            <MyHeader></MyHeader>
            <Routes>
                {/* 'element' prop replaces child components */}
                <Route path="/" element={<HomePage/>}/>
                <Route path="/user" element={<UserPage/>}/>
                <Route path="/post" element={<PostPage/>}>
                    <Route path=":pid" element={<PostPage/>} />
                    <Route path="/edit" element={<PostEditPage/>} />
                </Route>
                {/* Catch-all route uses path="*" */}
                <Route path="*" element={<HomePage/>}/>
            </Routes>
        </div>
    );
}

export default App;
