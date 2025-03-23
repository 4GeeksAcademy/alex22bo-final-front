import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";
// Custom Component
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
// Custom Page
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Home } from "./pages/Home.jsx";
import { Error404 } from "./pages/Error404.jsx";
import { Login } from "./pages/Login.jsx";
import { Updatecontact } from "./component/Updatecontact.jsx";
import { Contactlist } from "./pages/Contactlist.jsx";
import { NewContact } from "./component/NewContact.jsx";
// STAR WARS
import { CharactersPage } from "./pages/StarWars_Pages/CharactersPage.jsx";
import { CharacterDetailPage } from "./pages/StarWars_Pages/CharacterDetailPage.jsx";
import { StarshipsPage } from "./pages/StarWars_Pages/StarshipsPage.jsx";
import { StarShipDetailPage } from "./pages/StarWars_Pages/StarshipDetailPage.jsx";
import { PlanetsPage } from "./pages/StarWars_Pages/PlanetsPage.jsx";
import { PlanetDetailPage } from "./pages/StarWars_Pages/PlanetDetailPage.jsx";



// Create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        {/* STAR WARS */}
                        <Route element={<CharactersPage/>} path="/characters-page" />
                        <Route element={<CharacterDetailPage/>} path="/character-detail/:uid"/>
                        <Route element={<StarshipsPage />} path="/starships-page"/>
                        <Route element={<StarShipDetailPage/>} path="/starship-detail/:uid"/>
                        <Route element={<PlanetsPage />} path="/planets-page"/>
                        <Route element={<PlanetDetailPage />} path ="/planet-detail/:uid"/>
                        {/* Contact - List */}                            
                        <Route element={<Contactlist/>} path="/contactlist"/>
                        <Route element={<NewContact/>} path="/newcontact"/>                       
                        <Route element={<Updatecontact/>} path="/updatecontact"/>
                        {/* JWT */}
                        <Route element={<Login/>} path="/login"/>
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Error404/>} path="*" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
