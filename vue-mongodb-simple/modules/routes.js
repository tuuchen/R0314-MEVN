const express = require("express");
const controller = require("./controller");
const router = express.Router();

router.route('/api/search/:title').get(controller.searchMovie);
router.route('/api/newmovie').post(controller.addMovie);

module.exports = router;