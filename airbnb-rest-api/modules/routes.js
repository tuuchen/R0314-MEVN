const express = require('express');
const controller = require('./controller');
const router = express.Router();

// Routes that direct to desired functions
router.route(['/', '/api']).get(controller.redirectToAll);
router.route('/api/id/:id').get(controller.searchID);
router.route('/api/country/:country').get(controller.getAll);
router
  .route('/api/country/:country/:type/:keyword')
  .get(controller.searchKeyword);
router.route('/api/add').post(controller.addAirbnb);
router.route('/api/edit').put(controller.editAirbnb);
router.route('/api/delete/:id').delete(controller.deleteAirbnb);
router.route(/.*/).get(controller.unkownUrl);

module.exports = router;
