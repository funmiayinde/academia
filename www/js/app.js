var app = angular.module('starter', ['ionic', 'starter.controllers','ngCordova','starter.services','ngStorage']);

app.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');

    $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/mainmenu.html',
      controller:'LoginCtrl'
    })
    .state('mainmenu', {
      url: '/mainmenu',
      templateUrl: 'templates/mainmenu.html',
      controller:'MainCtrl'
    })
    .state('view_book', {
      url: '/view_book',
      templateUrl: 'templates/view_book.html',
      controller:'MainCtrl'
    })
      .state('view_article', {
      url: '/view_article',
      templateUrl: 'templates/view_article.html',
      controller:'MainCtrl'
    })
      .state('all_article', {
      url: '/all_article',
      templateUrl: 'templates/all_article.html',
      controller:'MainCtrl'
    });



    $urlRouterProvider.otherwise('/login');

});
