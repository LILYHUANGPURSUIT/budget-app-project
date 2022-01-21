const express = require("express");
const app = express();
const budgetingController = require("./controllers/budgetingController.js");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/transactions", budgetingController);

app.get("/",(req, res) => {
    res.send("Welcome to our Budgeting App!")
})

app.get("*", (req, res) => {
    res.status(404).json({error: "Page not found."})
})

module.exports = app;