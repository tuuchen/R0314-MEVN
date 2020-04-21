const mongo = require('./mongoose');

// Custom messages
const internalError = 'Uh oh! Something totally unexpected happened!';
const noResultError = 'Uh oh! No results!';
const urlError = 'URL not found. Try /api for results.';
const deleteMsg = 'Item deleted successfully!';
const addMsg = 'Item added successfully!';
const editMsg = 'Edit successfull!';
const maxPages = 60;

module.exports = {
  // Get all
  getAll: function (req, res) {
    if (req.query.page > maxPages) {
      res.status(200).json({ error: noResultError });
    } else {
      mongo.getData(req.query.page, function (err, results) {
        if (err) {
          res.status(500).json({ error: internalError });
        } else if (results.docs.length === 0) {
          res.status(200).json({ error: noResultError });
        } else {
          if (results.totalPages > maxPages) {
            results.totalPages = maxPages;
          }
          if (req.query.page == maxPages) {
            results.hasNextPage = false;
            results.nextPage = null;
          }
          res.status(200).json(results);
        }
      });
    }
  },
  // Search by ID
  searchID: function (req, res) {
    let id = req.params.id;
    mongo.findByID(id, function (err, results) {
      console.log(results);
      if (err) {
        res.status(500).json({ error: internalError });
      } else if (results === null || results == undefined) {
        res.status(200).json({ error: noResultError });
      } else {
        res.status(200).json(results);
      }
    });
  },
  // Search by keyword
  searchKeyword: function (req, res) {
    if (req.query.page > maxPages) {
      res.status(200).json({ error: noResultError });
    } else {
      let data = {
        search: {
          keyword: req.params.keyword,
          page: req.query.page,
        },
      };
      mongo.findKeyword(data, function (err, results) {
        if (err) {
          res.status(500).json({ error: internalError });
        } else if (results.docs.length === 0) {
          res.status(200).json({ error: noResultError });
        } else {
          if (results.totalPages > maxPages) {
            results.totalPages = maxPages;
          }
          if (req.query.page == maxPages) {
            results.hasNextPage = false;
            results.nextPage = null;
          }
          res.status(200).json(results);
        }
      });
    }
  },
  // Add
  addAirbnb: function (req, res) {
    let form = req.body;
    mongo.postData(form, function (err, results) {
      if (err) {
        res.status(500).json({ error: internalError });
      } else {
        res.statusMessage = addMsg;
        res.status(200).json(results);
      }
    });
  },
  // Edit
  editAirbnb: function (req, res) {
    let form = req.body;
    mongo.editData(form, function (err, results) {
      if (err) {
        res.status(500).json({ error: internalError });
      } else {
        res.statusMessage = editMsg;
        res.status(200).json(results);
      }
    });
  },
  // Delete by ID
  deleteAirbnb: function (req, res) {
    let id = req.params.id;
    mongo.deleteData(id, function (err, results) {
      if (err) {
        res.status(500).json({ error: internalError });
      } else {
        res.statusMessage = deleteMsg;
        res.status(200).json(results);
      }
    });
  },
  // If no page number is given, redirect to first
  redirectAll: function (req, res) {
    res.redirect('/api/all/');
  },
  // Uknown path: /* Do something here */
  unkownUrl: function (req, res) {
    res.status(200).json({ error: urlError });
  },
};
