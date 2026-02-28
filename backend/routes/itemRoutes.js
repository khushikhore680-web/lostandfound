const express = require("express");
const router = express.Router();
const Item = require("../models/LostItem");

router.post("/add", async (req, res) => {
    try {
        // Ensure status defaults to 'lost' when not provided
        const payload = Object.assign({ status: 'lost' }, req.body);
        const newItem = new Item(payload);
        await newItem.save();
        res.json(newItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/all", async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get only lost items
router.get("/lost", async (req, res) => {
    try {
        const items = await Item.find({ status: 'lost' });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get only found items
router.get("/found", async (req, res) => {
    try {
        const items = await Item.find({ status: 'found' });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;