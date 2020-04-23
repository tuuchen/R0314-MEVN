const mongo = require('./mongoose');
const service = require('./services');
const messages = require('./messages');

module.exports = {
  // Get all
  getAll: function (req, res) {
    const data = service.paramsHelper(req);
    data.all = true;
    mongo.getData(data, function (err, results) {
      return service.resHelper(req, res, err, results);
    });
  },
  // Search by ID
  searchID: function (req, res) {
    let id = req.params.id;
    mongo.findByID(id, function (err, results) {
      return service.resHelper(req, res, err, results);
    });
  },
  // Search by keyword
  searchKeyword: function (req, res) {
    const data = service.paramsHelper(req);
    mongo.findKeyword(data, function (err, results) {
      return service.resHelper(req, res, err, results);
    });
  },
  // Add
  addAirbnb: function (req, res) {
    let form = req.body;
    mongo.postData(form, function (err, results) {
      return service.resHelper(req, res, err, results);
    });
  },
  // Edit
  editAirbnb: function (req, res) {
    let form = req.body;
    mongo.editData(form, function (err, results) {
      return service.resHelper(req, res, err, results);
    });
  },
  // Delete by ID
  deleteAirbnb: function (req, res) {
    let id = req.params.id;
    mongo.deleteData(id, function (results) {
      if (results === 404) {
        res.status(404).json({ error: messages.noResultError });
      } else if (results === 500) {
        res.status(500).json({ error: messages.internalError });
      } else {
        res.statusMessage = messages.successMsg;
        res.status(200).json({ ok: messages.successMsg });
      }
    });
  },
  // Redirect to query /all
  redirectToAll: function (req, res) {
    res.redirect('/api/all');
  },
  // Uknown path: /* Do something here */
  unkownUrl: function (req, res) {
    res.status(200).json({ error: messages.urlError });
  },
};
