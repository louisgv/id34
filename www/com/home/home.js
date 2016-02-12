'use strict()';

var memeAPI = "./com/home/meme.json";

function HomeCtrl($scope, $interval, $http, $ionicPopup, $timeout) {
  console.log('HomeCtrl');

  $scope.$on('$ionicView.enter', function (e) {
    $http.get(memeAPI)
      .then(function (resp) {
        $scope.memes =
          // resp.data.data.memes;
          resp.data;
        console.log($scope.memes);
      })
  });

  $scope.getRandomIdea = function () {
    $http({
        method: 'GET',
        url: 'http://itsthisforthat.com/api.php?text'
      })
      .then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response);
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
  }


}
