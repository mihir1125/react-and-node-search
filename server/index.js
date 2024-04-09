const express = require("express");
const path = require("path");
const cors = require("cors");
const mysql = require("mysql");
const { characters } = require("./characters.json");
const app = express();
const ADDRESS = `${process.env.SERVERADDRESS}:${process.env.SERVERPORT}`;

app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.MYSQLPASSWORD,
    database: "cloudcomputing",
});

con.connect(function (err) {
    if (err) {
        console.log("Error:\n", err);
        throw err;
    }
    console.log("Connected to databse!");
});

app.get("/api/get/character-list", (req, res) => {
    con.query("SELECT id, title FROM posts", (err, result, fields) => {
        if (err) {
            console.log("Error:\n", err);
            res.sendStatus(500);
            return;
        }
        const charList = [];
        result.forEach((char) => {
            const { id, title } = char;
            charList.push({ id: id, title: title });
        });
        res.send(charList);
    });
});

app.get("/api/get/character-card/:id", (req, res) => {
    const card = characters[req.params.id];
    con.query(
        `SELECT * FROM posts WHERE id = ${req.params.id}`,
        (err, result, fields) => {
            if (err) {
                console.log("Error:\n", err);
                res.sendStatus(500);
                return;
            }
            const { id, title, author, image, description } = result[0];
            const charCard = {
                id: id,
                title: title,
                author: author,
                image: image,
                description: description,
            };
            res.send(charCard);
        }
    );
});

app.post("/newpost", (req, res) => {});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
