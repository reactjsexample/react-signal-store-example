import './app.css';
import MyHeader from "./app/shared/Header";
import HomePage from "./app/features/home/home-page.tsx";
import PostEditPage from "./app/features/post/post-edit/post-edit-page.tsx";
import PostPage from "./app/features/post/post-page.tsx";
import {Route, Routes} from "react-router";
import UserPage from "./app/features/user/user-page.tsx";

function App() {

    return (
        <div>
            <MyHeader></MyHeader>
            <Routes>
                {/* 'element' prop replaces child components */}
                <Route path="/" element={<HomePage/>}/>
                <Route path="/user" element={<UserPage/>}/>
                <Route path="/post" element={<PostPage/>}/>
                <Route path="/post-edit" element={<PostEditPage/>}/>
                {/* Catch-all route uses path="*" */}
                <Route path="*" element={<HomePage/>}/>
            </Routes>
        </div>
    );
}

export default App;
