'use strict()';

var conceptsAPI = "./com/home/db/concepts.json";
var annotationsAPI = "./com/home/db/annotations.json";
var personalityAPI = "./com/home/db/personality.json";
var toneAPI = "./com/home/db/tone.json";

function HomeCtrl($scope, $interval, $http, $ionicPopup, $timeout) {
  console.log('HomeCtrl');

  var home = this;

  home.idea = {
    raw: "", // Raw idea expression
    pitch: "", // The pitch
    annotations: null, // All keywords extractable
    related: null, // All related concepts, expecting about 30 mores of them
    product: "",
    market: "",
    tone: null,
    personality: null
  };

  home.getRandomIdea = function () {
    $http.jsonp('http://itsthisforthat.com/api.php?call=JSON_CALLBACK')
      .success(function (data) {
        console.log(data);

        home.idea.product = data.this;
        home.idea.market = data.that;

        home.idea.raw = "So, Basically, It's Like A " + data.this + " for " + data.that + ".";
        console.log(home.idea.raw);
      });
  };

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
  };

  home.getAnnotations = function () {
    // $http.get('https://id34.mybluemix.net/a/' + home.idea.raw)
    $http.get(annotationsAPI)
      .then(
        function (response) {
          console.log(response.data);
          home.idea.annotations = response.data;
        },
        function (err) {
          console.log(err);
        }
      )
  };

  home.getPersonality = function () {
    $http.get(personalityAPI)
      .then(
        function (response) {
          console.log("Personality ---------------");
          console.log(response.data.tree.children[0].children[0].children);
          home.idea.personality = response.data;

          var raw = response.data.tree.children[0].children[0].children;

          $scope.labels = raw.map(function(a) {
            return a.id;
          });
          
          $scope.data = raw.map(function(a) {
            if(a.percentage){
              return a.percentage * 100;
            }
          });

        },
        function (err) {
          console.log(err);
        }
      )
  };

  home.getTone = function () {
    $http.get(toneAPI)
      .then(
        function (response) {
          console.log(response.data);
          home.idea.tone = response.data;
        },
        function (err) {
          console.log(err);
        }
      )
  };

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

  //* //////////////////////////////////////////////

  home.getAnnotations();
  home.getRelatedConcepts();
  home.getTone();
  home.getPersonality();

  //*/////////////////////////////////////////////

}
