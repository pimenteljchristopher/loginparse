angular.module('loginparse.controllers')
.controller('ProfileEditCtrl', function($scope,$state,$ionicLoading,$ionicPopup,localStorageService,DataAccess) {
  $scope.updateUser = function(id,t,data){

    DataAccess.edit(id,t,data).then(function(result){
      $ionicLoading.show();
      if(result.status == 200){
            DataAccess.me(t).then(function(result){
              $ionicLoading.hide();

              localStorageService.set('sessionUser', result.data);
              $ionicPopup.alert({
               title: 'Notification',
               template: 'Successfully save changes!'
             }).then(function(res) {
             $state.go('app.profile');
              console.log("successfully");
             });
              
             });
      }else{
           $ionicPopup.alert({
               title: 'Notification',
               template: 'Something went wrong'
             }).then(function(res) {
             $state.go('app.profile');
             });
      }
     
    });
    
  }
 
});