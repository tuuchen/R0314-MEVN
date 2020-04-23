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
    var newAirbnb = new Airbnb({
      _id: mongoose.Types.ObjectId(),
      bathrooms: query.bathrooms,
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
    newAirbnb.save(function (err, results) {
      results = service.docsHelper(results);
      callback(err, results);
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
