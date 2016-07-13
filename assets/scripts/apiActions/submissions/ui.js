'use strict';

// const app = require('../app.js');
const challengeApi = require('../challenges/api.js');
const challengeUi = require('../challenges/ui.js');

//
// const fileInput = require('../fileinput.js');


const multipleSubmissionsTemplate = require('../../templates/multipleSubmissions.handlebars');

const success = (data) => {
  console.log('data in generic success handler: ', data);
};

const failure = (error) => {
  console.error(error);
};

const viewUserSubmissionsSuccess = (data) => {
  $('.jumbotron').hide();
  $('#contents').empty();
  data.submissions.forEach((e) => e.createdAt = e.createdAt.split('T')[0]);
  $('#contents').html(multipleSubmissionsTemplate(data));
};

const viewAllSubmissionsSuccess = (data) => {
  console.log(data);
  $('.jumbotron').hide();
  $('#contents').empty();
  data.submissions.forEach((e) => e.createdAt = e.createdAt.split('T')[0]);
  $('#contents').html(multipleSubmissionsTemplate(data));
};

const submissionSuccess = (data) => {
  let id = data.upload._challenge;
  $('.fileinput-remove-button').trigger('click');
  $('.upload-container').hide();
  $('#submit-success').html('<h4 style="color:green"><span style="color:green" class="glyphicon glyphicon-folder-open"></span>&nbsp; File successfully submitted!</h5>').delay(1200).fadeOut();
  $('.upload-container').delay(1200).fadeIn();
  challengeApi.showChallenge(id)
  .then((data) => challengeApi.incrementSubmissionCount(data)
    .then(
      challengeApi.showChallengeSubmissions(id)
      .done(challengeUi.appendSubmissionsSuccess)
      .fail(challengeUi.failure)
    )
    .fail(challengeUi.failure)
  )
  .fail(challengeUi.failure);
};

const deleteSubmissionSuccess = (data) => {
  let id = data.responseSubmission._challenge;
  console.log(data.responseSubmission._challenge);
  challengeApi.showChallenge(id)
  .then((data) => challengeApi.decrementSubmissionCount(data))
  .fail(challengeUi.failure);
};

module.exports = {
  success,
  failure,
  viewUserSubmissionsSuccess,
  viewAllSubmissionsSuccess,
  submissionSuccess,
  deleteSubmissionSuccess,
};
