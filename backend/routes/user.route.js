const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.model");
const mongoose = require("mongoose");
const session = require('express-session');

router.get("/", async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    if (req.session.user.accessLevel !== "admin") {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.log("error in fetching users", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
})

module.exports = router;