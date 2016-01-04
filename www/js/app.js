// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('loginparse', 
  ['ionic', 
  'loginparse.googlemap',
  'loginparse.tindercards',
  'loginparse.gallery',
  'loginparse.controllers',
  'loginparse.services',
  'LocalStorageModule',
  'ionic.contrib.ui.tinderCards',
   'uiGmapgoogle-maps',
   'ngCordova' ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
//Configuration for localStorageService
.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('lp')
      .setStorageType('sessionStorage')
      .setNotify(true, true);
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('home',{
      url:'/home',
      templateUrl:'views/home.html',
      controller:'HomeCtrl'
    })
    .state("reset",{
      url:'/reset',
      templateUrl:'views/reset.html',
      controller:'ResetCtrl'
    })
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'views/menu.html',
    controller: 'AppCtrl'
  })


  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'views/profile.html',
        controller:'ProfileCtrl'
      }
    }
  })
  .state('app.map', {
    url: '/map',
    views: {
      'menuContent': {
        templateUrl: 'modules/googlemap/views/map.html',
        controller:'MapCtrl'
      }
    }
  })
    .state('app.profile-edit', {
    url: '/profile-edit',
    views: {
      'menuContent': {
        templateUrl: 'views/profile-edit.html',
        controller:'ProfileEditCtrl'
      }
    }
  })

  .state('app.dashboard', {
      url: '/dashboard',
      views: {
        'menuContent': {
          templateUrl: 'views/dashboard.html'
        }
      }
    })

    .state('app.tindercards', {
      url: '/tindercards',
      views: {
        'menuContent': {
          templateUrl: 'modules/tindercards/views/tindercards.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
     .state('app.favorites', {
      url: '/favorites',
      views: {
        'menuContent': {
          templateUrl: 'views/favorites.html',
          controller: 'FavoritesCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'views/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
});