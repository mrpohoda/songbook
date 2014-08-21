'use strict';

angular.module('songbookApp')
  .controller('MainCtrl', function ($scope, Songs) {

    $scope.songs = Songs;

    $scope.add = function() {
      Songs.$add({
        name: $scope.songName,
        played: false
      }).then(function (ref) {
        var id = ref.name();
        console.log('added record with id ' + id);
      }, function(){
        console.log('some error...');
      }).finally(function () {
        $scope.songName = '';
      });
    };

    $scope.remove = function(id) {
      Songs.$remove(id);
    };

    $scope.togglePlayed = function(id) {
      var song = $scope.songs[id];
      song.played = !song.played;
      $scope.songs.$save(id);
    };

  })
  .controller('EditCtrl', function ($scope, $location, $routeParams, $firebase, fbURL) {
    var songURL = fbURL + $routeParams.id;
    $scope.song = $firebase(new Firebase(songURL));

    $scope.edit = function() {
      $scope.song.$save();
      $location.path('/');
    };
  });
