const mongo = require('./mongoose');
const service = require('./services');
const msg = require('./messages');

module.exports = {
  // Get all
  getAll: function (req, res) {
    // send req data into paramsHelper to construct route params / queries
    const params = service.urlParams(req);
    mongo.getData(params, function (err, results) {
      // return results and status codes
      return service.validateResponse(res, err, results);
    });
  },
  // Search by ID
  searchID: function (req, res) {
    let id = req.params.id;
    mongo.findByID(id, function (err, results) {
      return service.validateResponse(res, err, results);
    });
  },
  // Search by keyword
  searchKeyword: function (req, res) {
    const params = service.urlParams(req);
    mongo.findKeyword(params, function (err, results) {
      return service.validateResponse(res, err, results);
    });
  },
  // Add
  addAirbnb: function (req, res) {
    let form = req.body;
    mongo.postData(form, function (err, results) {
      return service.validateResponse(res, err, results);
    });
  },
  // Edit
  editAirbnb: function (req, res) {
    let form = req.body;
    mongo.editData(form, function (err, results) {
      return service.validateResponse(res, err, results);
    });
  },
  // Delete by ID
  deleteAirbnb: function (req, res) {
    let id = req.params.id;
    mongo.deleteData(id, function (results) {
      if (results === 404) {
        res.status(404).json(msg.noResult);
      } else if (results === 500) {
        res.status(500).json(msg.internalError);
      } else {
        res.status(200).json(msg.success);
      }
    });
  },
  // Redirect to query /all
  redirectToAll: function (req, res) {
    res.redirect('/api/country/all');
  },
  // Uknown path: /* Do something here */
  unkownUrl: function (req, res) {
    res.status(404).json(msg.urlError);
  },
};
