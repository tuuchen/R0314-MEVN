const messages = require('./messages');

module.exports = {
  paramsHelper: function (req) {
    let data = {
      type: req.params.type,
      keyword: req.params.keyword,
      page: req.query.page,
      orderBy: req.query.order,
      sort: req.query.sort,
      filter: req.query.filter,
      minVal: req.query.min,
      maxVal: req.query.max,
      all: false,
    };
    return data;
  },
  docsHelper: function (results) {
    var data = {
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
    return data;
  },
  resHelper: function (req, res, err, results) {
    if (err) {
      return res.status(500).json({ error: messages.internalError });
    } else if (results === null || results == undefined) {
      return res.status(200).json({ error: messages.noResultError });
    } else if (
      (results.docs && results.docs.length === 0) ||
      (results.docs && results.docs[0] === null) ||
      results.length === 0
    ) {
      return res.status(200).json({ error: messages.noResultError });
    } else {
      if (results.totalPages > messages.maxPages) {
        results.totalPages = messages.maxPages;
      }
      if (req.query.page == messages.maxPages) {
        results.hasNextPage = false;
        results.nextPage = null;
      }
      res.statusMessage = messages.successMsg;
      return res.status(200).json(results);
    }
  },
  queryHelper: function (query) {
    var maxPerPage = 1;
    var sortValue = 'review_scores.review_scores_rating';
    var sortOrder = -1;
    var search = {};
    if (query.sort) {
      sortValue = query.sort;
    }
    if (query.orderBy === 'asc') {
      sortOrder = 1;
    }
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
    } else if (query.all && query.filter) {
      search = {
        [query.filter]: {
          $gte: query.minVal || 0,
          $lte: query.maxVal || 9999999999999,
        },
      };
    } else if (query.all) {
      search = {};
    } else {
      search = {
        [query.type]: query.keyword,
      };
    }
    var options = {
      sort: { [sortValue]: sortOrder },
      page: query.page,
      limit: maxPerPage,
      lean: true,
    };
    return {
      search: search,
      options: options,
    };
  },
};
