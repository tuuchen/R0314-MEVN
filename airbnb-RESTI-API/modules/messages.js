module.exports = {
  internalError: {
    type: 'Error',
    message: 'Uh oh! Something totally unexpected happened!',
  },
  urlError: {
    type: 'Not found',
    message:
      'Bad URL. Check API guide at https://github.com/tuuchen/R0314-MEVN/blob/master/airbnb-RESTI-API',
  },
  noResult: {
    type: 'Not found',
    message: 'Uh oh! No results!',
  },
  success: {
    type: 'Ok',
    message: 'Success!',
  },
};
