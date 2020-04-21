require('dotenv').config();
// Require Schema
const Airbnb = require('./airbnbSchema');
// Results per page
const maxPerPage = 20;
// Require Mongoose and setup connection
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
    var sortValue = 'review_scores.review_scores_rating';
    var sortOder = -1;
    sortValue = query.sort;
    if (query.orderBy === 'asc') {
      sortOder = 1;
    }
    var options = {
      sort: { [sortValue]: sortOder },
      page: query.page,
      limit: maxPerPage,
    };
    Airbnb.paginate({}, options, function (err, results) {
      console.log(err, results);
      callback(err, results);
    });
  },
  // Search by ID
  findByID: function (query, callback) {
    Airbnb.findById(query, function (err, results) {
      console.log(err, results);
      callback(err, results);
    });
  },
  // Search by keyword
  findKeyword: function (query, callback) {
    var sortValue = 'review_scores.review_scores_rating';
    var sortOder = -1;
    sortValue = query.sort;
    if (query.orderBy === 'asc') {
      sortOder = 1;
    }
    var options = {
      sort: { [sortValue]: sortOder },
      page: query.page,
      limit: maxPerPage,
    };
    var query = {
      name: new RegExp(query.keyword, 'i'),
    };
    Airbnb.paginate(query, options, function (err, results) {
      console.log(err, results);
      callback(err, results);
    });
  },
  // Add
  postData: function (query, callback) {
    var newAirbnb = new Airbnb({
      listing_url: query.url,
      name: query.name,
      summary: query.summary,
      space: query.space,
      description: query.description,
      neighborhood_overview: query.neighborhood,
      notes: query.notes,
      transit: query.transit,
      access: query.access,
      interaction: query.interaction,
      house_rules: query.rules,
      property_type: query.property,
      room_type: query.room,
      bed_type: query.bed,
      minimum_nights: query.min,
      maximum_nights: query.max,
      cancellation_policy: query.policy,
    });

    newAirbnb.save(function (err, result) {
      console.log(err, result);
      let data = [result];
      callback(err, data);
    });
  },
  // Edit
  editData: function (query, callback) {
    var editAirbnb = {
      listing_url: query.url,
      name: query.name,
      summary: query.summary,
      space: query.space,
      description: query.description,
      neighborhood_overview: query.neighborhood,
      notes: query.notes,
      transit: query.transit,
      access: query.access,
      interaction: query.interaction,
      house_rules: query.rules,
      property_type: query.property,
      room_type: query.room,
      bed_type: query.bed,
      minimum_nights: query.min,
      maximum_nights: query.max,
      cancellation_policy: query.policy,
    };

    Airbnb.findOneAndUpdate(
      { _id: query._id },
      editAirbnb,
      { new: true },
      function (err, result) {
        console.log(err, result);
        let data = [result];
        callback(err, data);
      }
    );
  },
  // Delete by ID
  deleteData: function (query, callback) {
    Airbnb.findByIdAndDelete(query, function (err, results) {
      if (err) {
        console.log(err);
        callback('Error', 500);
      } else {
        callback('Ok', 200);
      }
    });
  },
};
