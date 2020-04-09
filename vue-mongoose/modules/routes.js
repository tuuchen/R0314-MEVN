const express = require("express");
const controller = require("./controller");
const router = express.Router();

router.route('/api/search/:title').get(controller.searchMovie);
router.route('/api/newmovie').post(controller.addMovie);
router.route('/api/edit/').put(controller.editMovie);
router.route('/api/delete/:id').delete(controller.deleteMovie);

module.exports = router;