require('dotenv').config();
const Airbnb = require('./airbnbSchema');
const service = require('./services');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'sample_airbnb',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = {
  // Get all
  getData: function (query, callback) {
    // construct query with queryHelper
    const helper = service.queryHelper(query);
    Airbnb.paginate(helper.search, helper.options, function (err, results) {
      callback(err, results);
    });
  },
  // Search by ID
  findByID: function (query, callback) {
    Airbnb.findById(query, function (err, results) {
      results = service.docsHelper(results);
      callback(err, results);
    });
  },
  // Search by keyword
  findKeyword: function (query, callback) {
    const helper = service.queryHelper(query);
    Airbnb.paginate(helper.search, helper.options, function (err, results) {
      callback(err, results);
    });
  },
  // Add
  postData: function (query, callback) {
    var newData = service.newDataHelper(query);
    newData._id = mongoose.Types.ObjectId();
    var newAirbnb = new Airbnb(newData);
    newAirbnb.save(function (err, results) {
      results = service.docsHelper(results);
      callback(err, results);
    });
  },
  // Edit
  editData: function (query, callback) {
    var newData = service.newDataHelper(query);
    Airbnb.findOneAndUpdate(
      { _id: query._id },
      newData,
      { new: true, omitUndefined: true },
      function (err, results) {
        results = service.docsHelper(results);
        callback(err, results);
      }
    );
  },
  // Delete by ID
  deleteData: function (query, callback) {
    Airbnb.findByIdAndDelete(query, function (err, results) {
      if (err) {
        callback(500);
      } else if (results === null) {
        callback(404);
      } else {
        callback(200);
      }
    });
  },
};
