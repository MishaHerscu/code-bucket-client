'use strict';

// const app = require('../../app.js');
// const helpers = require('../../helpers.js');

const uploadFileSuccess = (data) => {
  if (data) {
    console.log(data);
  } else {
    console.log('Success');
  }
};

const failure = (error) => {
  console.error(error);
};



module.exports = {
  uploadFileSuccess,
  failure,
};