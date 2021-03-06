const msg = require('./messages');
module.exports = {
  // sort route params / queries into one object
  urlParams: function (req) {
    let obj = {
      country: req.params.country,
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
  // paginate results
  paginate: function (results) {
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
  validateResponse: function (res, err, results) {
    if (err) {
      return res.status(500).json(msg.internalError);
    } else if (
      results === null ||
      results === undefined ||
      results.length === 0
    ) {
      return res.status(404).json(msg.noResult);
    } else if (
      (results.docs && results.docs.length === 0) ||
      (results.docs && results.docs[0] === null)
    ) {
      return res.status(404).json(msg.noResult);
    } else {
      res.statusMessage = msg.success.message;
      return res.status(200).json(results);
    }
  },
  // construct search -object based on route params / queries
  getSearch: function (query) {
    var search = {};

    if (query.keyword) {
      query.keyword = !isNaN(query.keyword)
        ? (query.keyword = parseInt(query.keyword))
        : (query.keyword = new RegExp(query.keyword, 'i'));
    }

    if (query.country === 'all' && query.keyword && query.filter) {
      search = {
        [query.type]: query.keyword,
        [query.filter]: {
          $gte: query.minVal || 0,
          $lte: query.maxVal || 9999999999999,
        },
      };
    } else if (query.country === 'all' && query.filter) {
      search = {
        [query.filter]: {
          $gte: query.minVal || 0,
          $lte: query.maxVal || 9999999999999,
        },
      };
    } else if (query.country === 'all' && query.keyword && !query.filter) {
      search = {
        [query.type]: query.keyword,
      };
    } else if (query.country !== 'all' && query.keyword && query.filter) {
      search = {
        'address.country': query.country,
        [query.type]: query.keyword,
        [query.filter]: {
          $gte: query.minVal || 0,
          $lte: query.maxVal || 9999999999999,
        },
      };
    } else if (query.country !== 'all' && query.filter) {
      search = {
        'address.country': query.country,
        [query.filter]: {
          $gte: query.minVal || 0,
          $lte: query.maxVal || 9999999999999,
        },
      };
    } else if (query.country !== 'all' && query.keyword && !query.filter) {
      search = {
        'address.country': query.country,
        [query.type]: query.keyword,
      };
    } else if (query.country !== 'all' && !query.keyword && !query.filter) {
      search = {
        'address.country': query.country,
      };
    }

    return search;
  },
  // construct options -object based on route params / queries
  getOptions: function (query) {
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
  getQuery: function (query) {
    search = this.getSearch(query);
    options = this.getOptions(query);
    return {
      search: search,
      options: options,
    };
  },
  // construct object for new data
  newObject: function (query) {
    let obj = {
      listing_url: query.listing_url,
      name: query.name,
      summary: query.summary,
      interaction: query.interaction,
      house_rules: query.house_rules,
      property_type: query.property_type,
      room_type: query.room_type,
      bed_type: query.bed_type,
      minimum_nights: query.minimum_nights,
      maximum_nights: query.maximum_nights,
      cancellation_policy: query.cancellation_policy,
      last_scraped: query.last_scraped,
      calendar_last_scraped: query.calendar_last_scraped,
      first_review: query.last_review,
      last_review: query.last_review,
      accommodates: query.accommodates,
      bedrooms: query.bedrooms,
      beds: query.beds,
      number_of_reviews: query.number_of_reviews,
      bathrooms: query.bathrooms,
      amenities: query.amenities,
      price: query.price,
      security_deposit: query.security_deposit,
      cleaning_fee: query.cleaning_fee,
      extra_people: query.extra_people,
      guests_included: query.guests_included,
      images: {
        thumbnail_url: query.thumbnail_url,
        medium_url: query.medium_url,
        picture_url: query.picture_url,
        xl_picture_url: query.xl_picture_url,
      },
      host: {
        host_id: query.host_id,
        host_url: query.host_url,
        host_name: query.host_name,
        host_location: query.location,
        host_about: query.host_about,
        host_response_time: query.host_response_time,
        host_thumbnail_url: query.host_thumbnail_url,
        host_picture_url: query.picture_url,
        host_neighbourhood: query.host_neighbourhood,
        host_response_rate: query.host_response_rate,
        host_is_superhost: query.host_is_superhost,
        host_has_profile_pic: query.host_has_profile_pic,
        host_identity_verified: query.host_identity_verified,
        host_listings_count: query.host_listings_count,
        host_total_listings_count: query.host_total_listings,
        host_verifications: query.host_verifications,
      },
      address: {
        street: query.steet,
        suburb: query.suburb,
        government_area: query.government_area,
        market: query.market,
        country: query.country,
        country_code: query.country_code,
        location: {
          type: query.type,
          coordinates: query.coordinates,
          is_location_exact: query.is_location_exact,
        },
      },
      availability: {
        availability_30: query.availability_30,
        availability_60: query.availability_60,
        availability_90: query.availability_90,
        availability_365: query.availability_365,
      },
      review_scores: {
        review_scores_accuracy: query.review_scores_accuracy,
        review_scores_cleanliness: query.review_scores_cleanliness,
        review_scores_checkin: query.review_scores_checkin,
        review_scores_communication: query.review_scores_communication,
        review_scores_location: query.review_scores_location,
        review_scores_value: query.review_scores_value,
        review_scores_rating: query.review_scores_rating,
      },
      reviews: [
        {
          _id: query.review_id,
          date: query.date,
          listing_id: query.listing_id,
          reviewer_id: query.reviewer_id,
          reviewer_name: query.reviewer_name,
          comments: query.comments,
        },
      ],
    };
    return obj;
  },
};
