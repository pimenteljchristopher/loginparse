angular.module('loginparse.controllers')
.controller('ResetCtrl', function($scope, $stateParams,DataAccess,$state,$ionicLoading,$ionicPopup) {
  $scope.resetData = {email:""};
  $scope.doCancel = function(){
    $state.go('home');
  }
  $scope.doReset = function(email){

    $ionicLoading.show();
        DataAccess.reset(email).then(function(result){
          $scope.error = null;
          $ionicLoading.hide();
         $ionicPopup.alert({
           title: 'Notification',
           template: 'Change password was sent successfully'
         }).then(function(res) {
            $state.go('home',{});
         });
        },function(result){
           $scope.error = "Invalid email . Please try?";
           $ionicLoading.hide();
        });
      };

});
