import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/nav.jsx";
import CardContainer from "./components/pages.jsx";
import NewPost from "./components/newpost.jsx";
import "./App.css";
const { SERVERADDRESS, SERVERPORT } = process.env;
const server = `${SERVERADDRESS}:${SERVERPORT}`;

function App() {
    const [query, setQuery] = useState("");
    const [charList, setCharList] = useState([]);
    const [card, setCard] = useState({});

    function fetchCharList() {
        fetch(`${server}/api/get/character-list`)
            .then((res) => res.json())
            .then((res) => {
                setCharList(res);
            });
    }

    function fetchCard(id) {
        fetch(`${server}api/get/character-card/` + id)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setCard(res);
            });
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
            <Nav
                query={query}
                charList={charList}
                queryHandler={onKeyUpHandler}
                cardHandler={fetchCard}
            />
            <Routes>
                <Route path="/" element={<CardContainer card={card} />} />
                <Route path="/new" element={<NewPost />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
