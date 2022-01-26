const express = require("express");
const budgetRoutes = express.Router();
const budgetArr = require("../models/budgetData");

budgetRoutes.get("/", (req, res) => {
    res.json(budgetArr);
})

budgetRoutes.get("/:index", (req, res) => {
    const { index } = req.params;
    if(budgetArr[index]) {
        res.json(budgetArr[index]);
    } else {
        res.status(404).json({message: "Budge not found."})
    }
});

budgetRoutes.post("/", (req, res) => {
    budgetArr.push(req.body);
    res.json(budgetArr[budgetArr.length-1]);
});

budgetRoutes.put("/:index", (req, res) => {
    const { index } = req.params;
    if(!budgetArr[index]) {
        res.status(422).json({error: "Not found!"});
        return;
    };
    const { date, name, amount, from, category } = req.body;
    if(date && name && amount && from && category) {
        budgetArr[index] = {date, name, amount, from, category};
        res.json(budgetArr[index]);
    } else {
        res.status(422).json({
            error: "Please provide all fields."
        })
    }
});



budgetRoutes.delete("/:index", (req, res) => {
    const { index } = req.params;
    if(budgetArr[index]) {
        let removed = budgetArr.splice(index, 1);
        res.json(removed[0]);
    } else {
        res.status(404).json({error: "Not Found."})
    }
})

module.exports = budgetRoutes;