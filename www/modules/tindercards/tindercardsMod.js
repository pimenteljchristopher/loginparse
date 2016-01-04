angular.module('loginparse.tindercards', [])
.controller('PlaylistsCtrl', function($scope,$ionicLoading,$timeout,TDCardDelegate,Recommendations,localStorageService) {

  console.log('CARDS CTRL');
  // helper functions for loading
    var showLoading = function() {
       $ionicLoading.show({
          template: '<ion-spinner icon="lines">',
          noBackdrop: true
       });
    }
    var hideLoading = function() {
       $ionicLoading.hide();
    }
    // set loading to true the first time we load data from the server
    showLoading();
    var cardTypes = [];
  // get our first songs
    Recommendations.getNextSongs()
    .then(function(){
      $scope.currentSong = Recommendations.queue[0];
      //Will loop and insert queue song
         for (var i = 0; i < 10; i++) {
           var song = Recommendations.queue[i];
           var a = {"image_small":song.image_small,"image_medium":song.image_medium,"title":song.title,"artist":song.artist,"song_id":song.song_id};
              cardTypes.unshift(a);
              console.log(song);
         };
    }).then(function(){
      
         $timeout(function() {
           $scope.cards = Array.prototype.slice.call(cardTypes, 0);
       $scope.currentSong.loaded = true;
          // $timeout to allow animation to complete
           hideLoading();
       }, 250);
    });
  $scope.cardDestroyed = function(index) {
    console.log(JSON.stringify($scope.cards[index]));
  

    $scope.cards.splice(index, 1);
      Recommendations.nextSong();
      var song = Recommendations.queue[0];
       var a = {"image_small":song.image_small,"image_medium":song.image_medium,"title":song.title,"artist":song.artist,"song_id":song.song_id};
         cardTypes.unshift(a);
         $scope.cards = Array.prototype.slice.call(cardTypes, 0);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }
   $scope.transitionOut = function(card) {
  console.log('card transition out');
  console.log("test");
};
 
$scope.cardTransitionedRight = function(card) {
    console.log(card);
  console.log('card removed to the right');
  var song  = localStorageService.get('favorites');
  console.log(song);
  if (song === null) {
    song = [];
  }
    song.push($scope.cards[card]);
   localStorageService.set('favorites',song);
 
};
$scope.cardTransitionedLeft = function(card) {
  console.log('card removed to the left');
  console.log(card);
};
  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE NOPE');
     // $scope.addCard();
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE FAVORITE');
    console.log(index);
  
    // $scope.addCard();
  };

})
.factory('Recommendations', function ($http, SERVER, $q){
    
    var o = {
        queue: []
    };
    
    o.getNextSongs = function() {
        return $http ({
            method:'GET',
            url: SERVER.url + '/recommendations'
        })
        .success(function(data) {
            o.queue = o.queue.concat(data);
        });
    };
    
    o.nextSong = function() {
        o.queue.shift();
        
        if (o.queue.length <= 3) {
            o.getNextSongs();
        }
    };
    
    return o;
})
.controller('FavoritesCtrl', function($scope, $stateParams,$timeout,localStorageService) {
    $timeout(function() {
       // anything you want can go here and will safely be run on the next digest.
       $scope.favorites = localStorageService.get('favorites');
    });

   $scope.removeSong = function(song,index){
    console.log(song);
    console.log(index);
     var storage  = localStorageService.get('favorites');
     storage.splice(index, 1);
      localStorageService.set('favorites',storage);
      $scope.favorites = storage;
   }
})
.constant('SERVER', {
  // Local server
  //url: 'http://localhost:3000'

  // Public Heroku server
  url: 'https://ionic-songhop.herokuapp.com'
});