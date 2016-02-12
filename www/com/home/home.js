"use strict()";

var conceptsAPI = "./com/home/db/concepts.json";
var keywordsAPI = "./com/home/db/keywords.json";
var personalityAPI = "./com/home/db/personality.json";
var toneAPI = "./com/home/db/tone.json";
var analyzerAPI = "./com/home/db/analyzed.json"

function HomeCtrl($http) {
  console.log("HomeCtrl");

  var home = this;

  home.idea = {
    raw: "", // Raw idea expression
    pitch: "", // The pitch
    keyData: null, // All keywords extractable
    related: null, // All related concepts, expecting about 30 mores of them
    product: "",
    market: "",
    tone: null,
    personality: null
  };

  home.getRandomIdea = function () {
    $http.jsonp("https://itsthisforthat.com/api.php?call=JSON_CALLBACK")
      .success(function (data) {
        console.log(data);

        home.idea.product = data.this;
        home.idea.market = data.that;

        home.idea.raw = "So, Basically, It's Like " + data.this + " for " + data.that + ".";
        console.log(home.idea.raw);
      });
  };

  home.getRelatedConcepts = function () {
    // $http.get("https://id34.mybluemix.net/a/" + home.idea.raw)
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

  home.getKeywords = function () {
    console.log("GET KEY");

    // $http.get("https://id34.mybluemix.net/e/" + encodeURIComponent(home.idea.raw))
    $http.get(keywordsAPI)
      .then(
        function (response) {
          console.log(response);
          home.idea.keyData = response.data;
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

          home.labels = raw.map(function (a) {
            return a.id;
          });

          home.data = raw.map(function (a) {
            if(a.percentage) {
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
    // $http.get("https://id34.mybluemix.net/pa/" + encodeURIComponent(home.idea.raw))
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

  home.analyzeIdea = function () {
    home.getTone();

    // $http.get("https://id34.mybluemix.net/ai/" + encodeURIComponent(home.idea.raw))
    $http.get(analyzerAPI)
      .then(
        function (response) {
          console.log(response.data);
          home.idea.personality = response.data.profile;
          home.idea.related = response.data.conceptCollection[0];
        },
        function (err) {
          console.log(err);
        }
      );
  }

  home.getRandomIdea();

  //* //////////////////////////////////////////////

  // home.getRelatedConcepts();
  // home.getTone();
  // home.getPersonality();

  //*/////////////////////////////////////////////

}
