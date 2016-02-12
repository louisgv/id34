'use strict()';

var memeAPI = "./com/home/meme.json";

function HomeCtrl($interval, $http, $ionicPopup, $timeout) {
  console.log('HomeCtrl');

  var home = this;

  home.getRandomIdea = function () {
    $http.jsonp('http://itsthisforthat.com/api.php?call=JSON_CALLBACK')
      .success(function (data) {
        console.log(data);
        home.idea = "So, Basically, It's Like A " + data.this + " for " + data.that + ".";
        console.log(home.idea);
      });
  }
  home.getRandomIdea();

}
