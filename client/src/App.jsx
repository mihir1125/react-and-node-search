import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/nav.jsx";
import CardContainer from "./components/pages.jsx";
import "./App.css";

function App() {
    const [query, setQuery] = useState("");
    const [charList, setCharList] = useState([]);
    const [card, setCard] = useState({});

    function fetchCharList() {
        fetch("http://localhost:5000/api/get/character-list")
            .then((res) => res.json())
            .then((res) => setCharList(res));
    }

    function fetchCard(id) {
        fetch("http://localhost:5000/api/get/character-card/" + id)
            .then((res) => res.json())
            .then((res) => setCard(res));
        setQuery("");
    }

    function onKeyUpHandler(searchTerm) {
        setQuery(searchTerm.toLowerCase());
    }

    useEffect(() => {
        console.log("executed only once!");
        fetchCharList();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Nav
                                query={query}
                                charList={charList}
                                queryHandler={onKeyUpHandler}
                                cardHandler={fetchCard}
                            />
                            <CardContainer card={card} />
                        </>
                    }
                ></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
