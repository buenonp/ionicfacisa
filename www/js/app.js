// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic'])

app.controller('chatController', function($scope) {

  $scope.items = [];

  firebase.database().ref('mensagens').once('value').then(function(data) {
    if(data.val()){
      $scope.items = Object.keys(data.val()).map(function (key) { return {key: key, val: data.val()[key]}; });
      $scope.$apply();
    }
  });

  firebase.database().ref('mensagens').on('child_added', function(data) {
    $scope.items.push({key: data.key, val: data.val()});
  });

  $scope.enviarMensagem = function() {
    var data = new Date();
    var hora = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    firebase.database().ref().child('mensagens').push({hora: hora,texto:$scope.texto, nome:$scope.nome});
    $scope.texto = '';
  };

});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


