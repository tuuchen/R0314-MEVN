const express = require('express');
const controller = require('./controller');
const router = express.Router();

// Routes that direct to desired functions
router.route(['/api', '/api/getall']).get(controller.redirect);
router.route('/api/getall/page/:page').get(controller.getAll);
router.route('/api/getid/:id').get(controller.searchID);
router.route('/api/keyword/:keyword/page/:page').get(controller.searchKeyword);
router.route('/api/add').post(controller.addAirbnb);
router.route('/api/edit').put(controller.editAirbnb);
router.route('/api/delete/:id').delete(controller.deleteAirbnb);
router.route(/.*/).get(controller.unkownUrl);

module.exports = router;
