'use strict()';

var conceptsAPI = "./com/home/db/concepts.json";
var annotationsAPI = "./com/home/db/annotations.json";

function HomeCtrl($interval, $http, $ionicPopup, $timeout) {
  console.log('HomeCtrl');

  var home = this;

  home.idea = {
    raw: "", // Raw idea expression
    pitch: "", // The pitch
    annotations: null, // All keywords extractable
    related: null, // All related concepts, expecting about 30 mores of them
  }

  home.getRandomIdea = function () {
    $http.jsonp('http://itsthisforthat.com/api.php?call=JSON_CALLBACK')
      .success(function (data) {
        console.log(data);
        home.idea.raw = "So, Basically, It's Like A " + data.this + " for " + data.that + ".";
        console.log(home.idea.raw);
      });
  }

  home.getRelatedConcepts = function () {
    // $http.get('https://id34.mybluemix.net/a/' + home.idea.raw)
    $http.get(conceptsAPI)
      .then(
        function (response) {
          console.log(response.data);
          home.idea.related = response.data;
        },
        function (err) {
          console.log(err);
        }
      )
  }

  home.getAnnotations = function () {
    // $http.get('https://id34.mybluemix.net/a/' + home.idea.raw)
    $http.get(annotationsAPI)
      .then(
        function (response) {
          console.log(response.data);
          home.idea.annotations = response.data;
          home.getRelatedConcepts();
        },
        function (err) {
          console.log(err);
        }
      )
  }

  function analyzeIdea() {
    $http.get('https://id34.mybluemix.net/ai/' + home.idea)
      .then(
        function (response) {
          console.log(response.data);
        },
        function (err) {
          console.log(err);
        }
      );
  }

  home.getRandomIdea();

}
