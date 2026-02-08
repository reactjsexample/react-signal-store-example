// src/app/features/home/HomePage.tsx
import * as AppStore from "../../appStore.tsx";
import {useEffect} from "react";

function HomePage() {
    useEffect(() => {
        AppStore.setSelectedPage('home');
    }, []) // do this once after page is loaded

    return (
        <main>
            <section>
                <h2>Home</h2>
                <h3>Go to the Users page to see a list of Users</h3>
            </section>
        </main>
    );
}

export default HomePage;
