import './app.css';
import Header from "./app/shared/Header";
import HomePage from "./app/features/home/HomePage.tsx";
import PostEditPage from "./app/features/post/post-edit/PostEditPage.tsx";
import PostPage from "./app/features/post/PostPage.tsx";
import {Route, Routes} from "react-router";
import UserPage from "./app/features/user/UserPage.tsx";

function App() {

    return (
        <div>
            <Header></Header>
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
