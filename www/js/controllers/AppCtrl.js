angular.module('loginparse.controllers', [])

.controller('AppCtrl', function($scope, $timeout,$state,$ionicLoading,localStorageService,DataAccess, $ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  $scope.$on('$ionicView.enter', function(e) {
   $scope.sessionUser = localStorageService.get('sessionUser');
     console.log($scope.sessionUser);
  });
 //This will  call service Logout to send api request and remove history from localStorage.
  $scope.doLogout = function(data){
    console.log(data);
   $ionicLoading.show();
        DataAccess.logOut(data).then(function(result){
          localStorageService.remove('sessionUser');
          $scope.error = null;
          $ionicLoading.hide();
          $state.go('home');
         
        },function(result){
            $ionicLoading.hide();
           $ionicPopup.alert({
           title: 'Notification',
           template: 'No internet connection.'
         }).then(function(res) {
            $state.go('app.profile');
         });   
      });
  };



});