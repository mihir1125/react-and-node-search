const express = require("express");
const path = require("path");
const cors = require("cors");
const characters = require("./characters.json").characters;
const app = express();
const PORT = 5000;
const ADDRESS = `http://localhost:${PORT}`;

app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));

app.get("/api/get/character-list", (req, res) => {
    const charList = [];
    characters.forEach((char) => charList.push(char.title));
    res.send(charList);
});

app.get("/api/get/character-card/:id", (req, res) => {
    const card = characters[req.params.id];
    card.image = new URL(card.image, ADDRESS).href;
    res.send(card);
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
