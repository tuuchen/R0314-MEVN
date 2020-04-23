const messages = require('./messages');
module.exports = {
  // sort route params / queries into one object
  paramsHelper: function (req) {
    let obj = {
      all: req.params.all,
      type: req.params.type,
      keyword: req.params.keyword,
      page: req.query.page,
      perPage: req.query.perPage,
      orderBy: req.query.order,
      sort: req.query.sort,
      filter: req.query.filter,
      minVal: req.query.min,
      maxVal: req.query.max,
    };
    // clean null values
    Object.keys(obj).forEach((key) => obj[key] == null && delete obj[key]);
    return obj;
  },
  // reconstruct object for consistency
  docsHelper: function (results) {
    var obj = {
      docs: [results],
      totalDocs: null,
      totalPages: null,
      page: null,
      paginCounter: null,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    };
    return obj;
  },
  // return results, status codes and errors
  resHelper: function (req, res, err, results) {
    if (err) {
      return res.status(500).json({ error: messages.internalError });
    } else if (
      results === null ||
      results === undefined ||
      results.length === 0
    ) {
      return res.status(200).json({ error: messages.noResultError });
    } else if (
      (results.docs && results.docs.length === 0) ||
      (results.docs && results.docs[0] === null)
    ) {
      return res.status(200).json({ error: messages.noResultError });
    } else {
      res.statusMessage = messages.successMsg;
      return res.status(200).json(results);
    }
  },
  // construct search -object based on route params / queries
  searchHelper: function (query) {
    var search = {};
    if (!isNaN(query.keyword)) {
      query.keyword = parseInt(query.keyword);
    } else {
      query.keyword = new RegExp(query.keyword, 'i');
    }
    if (query.filter && !query.all) {
      search = {
        [query.type]: query.keyword,
        [query.filter]: {
          $gte: query.minVal || 0,
          $lte: query.maxVal || 9999999999999,
        },
      };
    } else if (query.all === 'all' && query.filter) {
      search = {
        [query.filter]: {
          $gte: query.minVal || 0,
          $lte: query.maxVal || 9999999999999,
        },
      };
    } else if (query.all !== 'all') {
      search = {
        [query.type]: query.keyword,
      };
    }
    return search;
  },
  // construct options -object based on route params / queries
  optionsHelper: function (query) {
    var maxPerPage = 20;
    var sortValue = 'review_scores.review_scores_rating';
    var sortOrder = -1;
    if (query.perPage) {
      maxPerPage = query.perPage;
    }
    if (query.sort) {
      sortValue = query.sort;
    }
    if (query.orderBy === 'asc') {
      sortOrder = 1;
    }
    var options = {
      sort: { [sortValue]: sortOrder },
      page: query.page,
      limit: maxPerPage,
      lean: true,
    };
    return options;
  },
  // construct search -object and options -object for return
  queryHelper: function (query) {
    search = this.searchHelper(query);
    options = this.optionsHelper(query);
    return {
      search: search,
      options: options,
    };
  },
};
