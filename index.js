const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();
const db = new sqlite3.Database("database.db");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// Crear tabla
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)");

// Mostrar todos
app.get("/", (req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        res.render("index", { users: rows });
    });
});

// Agregar
app.post("/add", (req, res) => {
    const name = req.body.name;
    db.run("INSERT INTO users (name) VALUES (?)", [name], () => {
        res.redirect("/");
    });
});

// Eliminar
app.get("/delete/:id", (req, res) => {
    db.run("DELETE FROM users WHERE id=?", [req.params.id], () => {
        res.redirect("/");
    });
});

// Editar
app.post("/edit/:id", (req, res) => {
    db.run("UPDATE users SET name=? WHERE id=?", [req.body.name, req.params.id], () => {
        res.redirect("/");
    });
});

app.listen(3000, () => console.log("Servidor corriendo"));
