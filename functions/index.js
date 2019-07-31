
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const clivodemo = require('./data/clivodemo');

admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.json ({ "messages" : [{ "text" :  "Héctor, dile a Armando que es la pistola" }]});
});

exports.clivodemosSaveAnswer = functions.https.onRequest((request, response) => {


  console.log("clivodemosSetAnswer : " + JSON.stringify(request.body) );
  
  // Grab the chatfuel user ID parameter.
  const userId = request.body.messengerUserId;
  // Grab the question ID parameter.

  const locale = request.body.locale;
  const questionId = request.body.lastVisitedBlockId;
  // Grab the user answer parameter.
  const userAnswer = request.body.gender;


  const lang = getLang(locale);

  const answerCode = getAnswerCode(lang, userAnswer);

  var answer = {};
  answer["lastQuestionId"] = questionId;
  answer[questionId] = answerCode;

  const userAnswersRef = admin.database().ref('/clivodemo/answers').child(userId);

  userAnswersRef.update(answer)
  .then(function() {
	response.end();
  });
	
});



