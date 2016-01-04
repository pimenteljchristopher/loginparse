angular.module('loginparse.googlemap', [])


.controller('MapCtrl', function($scope, $stateParams,$cordovaGeolocation) {
   $scope.map = {center: {latitude: 40.74965, longitude: -73.98479 }, zoom: 2 };
});