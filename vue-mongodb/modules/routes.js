var express = require("express");
var controller = require("./controller");
var router = express.Router();

router.route('/api/search/:title').get(controller.searchMovie);
router.route('/api/newmovie').post(controller.addMovie);

module.exports = router;