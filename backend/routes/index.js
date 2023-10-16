const express = require('express');
const { userRoutes } = require("./UserRoute");

const router = express.Router();

userRoutes(router);

module.exports = router;