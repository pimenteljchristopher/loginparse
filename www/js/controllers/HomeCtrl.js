angular.module('loginparse.controllers')
.controller('HomeCtrl',function($scope, $ionicModal,$ionicLoading,$state,DataAccess,localStorageService){
   $scope.loginData = {username:"",password:""};
   $scope.registerData = {}
   
    //Check if the user is already login
   function sessionCheck(){
    $ionicLoading.show();
    $scope.sessionUser = localStorageService.get('sessionUser');
    if($scope.sessionUser != null){
      $ionicLoading.hide();
      $state.go('app.profile');
      console.log($scope.sessionUser);
      }
    else
      $ionicLoading.hide();
    }
   
    sessionCheck();

  
//This will  call service Register to send api request.
  $scope.doLogin = function(data){
    $ionicLoading.show();
        DataAccess.logIn(data.username,data.password).then(function(result){
          console.log(result);
          $scope.modalLogin.hide();
          //session will be store
          localStorageService.set('sessionUser', result.data);
          $scope.error = null;
          $scope.loginData = {username:"",password:""};
          $state.go('app.profile',{});
          $ionicLoading.hide();
        },function(result){
           $scope.error = "Incorrect username & password.";
           $ionicLoading.hide();
        });
  };
  //This will  call service Signup to send api request.
  $scope.doRegister = function(data){
    console.log("click");
     $ionicLoading.show();
      DataAccess.signUp(data).then(function(result){
        //call login service
            DataAccess.logIn(data.username,data.password).then(function(result){
              console.log(result);
              $scope.modalRegister.hide();
              //session will be store
              localStorageService.set('sessionUser', result.data);
              $scope.error = null;
              $scope.registerData = {username:"",password:"",email:""};
              $state.go('app.profile',{});
              $ionicLoading.hide();
            },function(result){
               $scope.error = "Something went wrong";
               $ionicLoading.hide();
            });
        },function(result){
           $scope.error = "Incorrect information.Try again?";
           $ionicLoading.hide();
        });
  }
  //This will go to state reset.
  $scope.doReset = function(){
    $scope.modalLogin.hide();
    $state.go('reset');
  }
  $ionicModal.fromTemplateUrl('views/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalLogin = modal;
  });
    $ionicModal.fromTemplateUrl('views/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalRegister = modal;
  });

   // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modalLogin.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modalLogin.show();
  };
    // Triggered in the register modal to close it
  $scope.closeRegister = function() {
    $scope.modalRegister.hide();
  };

  // Open the login modal
  $scope.register = function() {
    $scope.modalRegister.show();
  };
});