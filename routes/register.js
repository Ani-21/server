const express = require("express");
const router = express.Router();
const registerConroller = require("../controllers/registerConroller");

router.post("/", registerConroller.handleNewUser);

module.exports = router;
