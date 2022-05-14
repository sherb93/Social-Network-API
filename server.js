const express = require("express");
const db = require("./config/connection");

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}`);
    });
});