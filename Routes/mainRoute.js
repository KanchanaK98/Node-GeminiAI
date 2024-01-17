const router = require("express").Router();

const {createResponse} = require("../Controllers/mainController");

router.post("/processText",createResponse);

module.exports = router;