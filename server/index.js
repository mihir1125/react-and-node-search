const express = require("express");
const path = require("path");
const cors = require("cors");
const mysql = require("mysql");
const multer = require("multer");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();
const app = express();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, "temp.png");
    },
});
const upload = multer({
    storage: storage,
});
const { SERVERPORT, WEBSERVERADDRESS, WEBSERVERPORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: "false" }));
app.use(cors());

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

app.post("/newpost", upload.single("image"), (req, res, next) => {
    const imageBlob = fs.readFileSync(req.file.path);
    const { username: author, title, desc: description } = req.body;
    const image = "data:image/png;base64," + imageBlob.toString("base64");
    con.query(
        `INSERT INTO posts SET ?`,
        {
            author: author,
            title: title,
            image: imageBlob,
            description: description,
        },
        (err, result, fields) => {
            if (err) {
                console.log("Error:\n", err);
                return res.redirect(
                    500,
                    `${WEBSERVERADDRESS}:${WEBSERVERPORT}/newpost`
                );
            }
            res.redirect(302, `${WEBSERVERADDRESS}:${WEBSERVERPORT}/`);
        }
    );
});

app.listen(SERVERPORT, () => {
    console.log(`Server listening on port: ${SERVERPORT}`);
});
