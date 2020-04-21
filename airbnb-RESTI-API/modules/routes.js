const express = require('express');
const controller = require('./controller');
const router = express.Router();

// Routes that direct to desired functions
router.route(['/api', '/api/all']).get(controller.redirectAll);
router.route('/api/all/pg/:page').get(controller.getAll);
router.route('/api/id/:id').get(controller.searchID);
router.route('/api/k/:keyword').get(controller.redirectKeyword);
router.route('/api/k/:keyword/pg/:page').get(controller.searchKeyword);
router.route('/api/add').post(controller.addAirbnb);
router.route('/api/edit').put(controller.editAirbnb);
router.route('/api/delete/:id').delete(controller.deleteAirbnb);
router.route(/.*/).get(controller.unkownUrl);

module.exports = router;
