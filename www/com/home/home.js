"use strict()";

var conceptsAPI = "./com/home/db/concepts.json";
var keywordsAPI = "./com/home/db/keywords.json";
var personalityAPI = "./com/home/db/personality.json";
var toneAPI = "./com/home/db/tone.json";
var analyzerAPI = "./com/home/db/analyzed.json"

function HomeCtrl($http, $ionicLoading) {
  console.log("HomeCtrl");

  var home = this;

  home.idea = {
    raw: "", // Raw idea expression
    pitch: "", // The pitch
    keyData: null, // All keywords extractable
    related: null, // All related concepts, expecting about 30 mores of them
    tone: null,
    personality: null,
    conceptCollection: null
  };

  home.graph = {
    conceptCollection: {
      concepts: [] // Lots of concept chart?
    },
    tone: {
      emotion: {
        labels: [],
        data: []
      },
      writing: {
        labels: [],
        data: []
      },
      social: {
        labels: [],
        data: []
      }
    },
    personality: {
      bigFive: {

      },
      needs: {

      },
      values: {

      }
    }
  }

  function resetToneGraph() {
    home.graph.tone = {
      emotion: {
        labels: [],
        data: []
      },
      writing: {
        labels: [],
        data: []
      },
      social: {
        labels: [],
        data: []
      }
    }
  }

  home.getRandomIdea = function () {
    $http.jsonp("https://itsthisforthat.com/api.php?call=JSON_CALLBACK")
      .success(function (data) {
        console.log(data);

        // home.idea.product = data.this;
        // home.idea.market = data.that;

        home.idea.raw = "So, Basically, It's Like " + data.this + " for " + data.that + ".";
        console.log(home.idea.raw);
      });
  };

  home.getTone = function () {
    resetToneGraph();
    $http.get("https://id34.mybluemix.net/pa/" + encodeURIComponent(home.idea.raw))
      .then(
        // $http.get(toneAPI)
        function (response) {
          console.log(response.data);

          home.idea.tone = response.data;

          var tc = response.data.document_tone.tone_categories;
          for(var i = 0; i < tc[0].tones.length; i++) {
            home.graph.tone.emotion.labels.push(tc[0].tones[i].tone_name);
            home.graph.tone.emotion.data.push((tc[0].tones[i].score * 100).toFixed(2));
          }

          for(var i = 0; i < tc[1].tones.length; i++) {
            home.graph.tone.writing.labels.push(tc[1].tones[i].tone_name);
            home.graph.tone.writing.data.push((tc[1].tones[i].score * 100).toFixed(2));
          }

          for(var i = 0; i < tc[2].tones.length; i++) {
            home.graph.tone.social.labels.push(tc[2].tones[i].tone_name);
            home.graph.tone.social.data.push((tc[2].tones[i].score * 100).toFixed(2));
          }

        },
        function (err) {
          console.log(err);
        }
      )
  };

  home.analyzeIdea = function () {
    $ionicLoading.show({
      template: '<ion-spinner icon="ripple" class="spinner-energized"></ion-spinner><br>Analyzing your possible future',
      animation: 'fade-in'
    });

    home.getTone();

    // $http.get("https://id34.mybluemix.net/ai/" + encodeURIComponent(home.idea.raw))
    $http.get(analyzerAPI)
      .then(
        function (response) {
          console.log(response.data);

          home.idea.personality = response.data.profile;

          home.idea.conceptCollection = response.data.conceptCollection;

          $ionicLoading.hide();
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
