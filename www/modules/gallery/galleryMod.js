angular.module('loginparse.gallery', [])


.controller('Uploadtrl', function($scope, $stateParams,DataAccess,localStorageService) {

	var sessionUser = localStorageService.get('sessionUser');

		     $scope.uploadFile = function(files) {
			    DataAccess.uploadPhoto(files).then(function(result){
			      console.log(result);
			         DataAccess.uploadConnect(sessionUser.username,result.data).then(function(result){
			        console.log(result);
			      });
			    });
	         };
            $scope.getPhoto = function(){
            	console.log("click");
            	console.log(sessionUser);
            	   DataAccess.getPhotoAll().then(function(result){
			        console.log(result);
			      });
            }
            $scope.getUser= function(){
            	console.log("click");
            	console.log(sessionUser);
            	   DataAccess.getPhotoUser(sessionUser.username).then(function(result){
			        console.log(result);
			      });
            }
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider


    .state('app.gallery', {
    url: '/gallery',
    views: {
      'menuContent': {
        templateUrl: 'modules/gallery/views/gallery.html',
        controller:'Uploadtrl'
      }
    }
  });


  });
