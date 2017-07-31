/**
 * Created by funmi on 3/16/17.
 */
var app = angular.module('starter.controllers', ['starter.services']);

app.controller('LoginCtrl', function ($scope, $window, $state, $ionicPopup, $ionicLoading, UserService, $q) {

  var userID = $window.localStorage.getItem("userID");
  if (userID != undefined && userID != "") {
    $state.go("mainmenu");
  }
  $scope.doLogin = function (email, password) {
    console.log(email);
    console.log(password);
    if (email == undefined && password == undefined) {
      showAlert("error", "no field must be empty");
      return;
    }
    if (email == "funmiayinde11@gmail.com" && password == "funmite11") {
      $window.localStorage.setItem("userID", "funmite11");
      $state.go("mainmenu");

    } else {
      showAlert("error", "incorrect email or password")
    }
  };

  var facebookLoginSuccess = function (response) {
    if (!response.authResponse) {
      facebookLoginError("cannot find the auth response");
    }
  };

  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();
    facebookConnectPlugin.api('/me=?fields=email,name&access_token=' + authResponse.accessToken, null, function (res) {
      console.log(res);
      info.resolve(res);
    }, function (res) {
      console.log(res);
      info.reject(res);
    });
    return info.promise;
  };

  // this function is used to execute facebook login when pressed
  $scope.loginWithFacebook = function () {
    facebookConnectPlugin.getLoginStatus(function (success) {
      console.log("success response: " + JSON.stringify(success));
      if (success.status === "connected") {
        // check if we have our user saved
        var user = UserService.getUser();
        console.log("user details: " + JSON.stringify(user));
        if (!user.userID) {
          getFacebookProfileInfo(success.authResponse).then(function (profile_info) {
            UserService.setUser(profile_info);
            $ionicLoading.hide();
          }, function (err) {
            console.log("error from profile: " + err);
            showAlert("error", "An error occur");
          })
        } else {
          // go to main menu
          $state.go("mainmenu");
        }
      } else {
        console.log("get login status:", success.status);
        $ionicLoading.show({
          template: '<ion-spinner icon="android"></ion-spinner><br />please wait,while logging in...'
        });
        facebookConnectPlugin.login(['email', 'public_profile'], facebookLoginSuccess, facebookLoginError);
      }
    })
  };

  var facebookLoginError = function (error) {
    console.log("error from facebook: " + JSON.stringify(error));
    $ionicLoading.hide();
  };

  $scope.loginWithGoogle = function () {
    $ionicLoading.show({
      template: '<ion-spinner icon="android"></ion-spinner><br />please wait,while logging in...'
    });

    window.plugins.googleplus.login({
      'scopes': 'profile email',
      'webClientId': '800623416772-tnqeb752nvnbe9s7uuklt751odg42mab.apps.googleusercontent.com'
    }, function (success) {
      console.log("sign up with google response : " + success);
      UserService.setUser(success);
      $ionicLoading.hide();
    }, function (err) {
      console.log("google error: " + JSON.stringify(err));
      $ionicLoading.hide();
      showAlert("error", "An error occur");
    })
  };
  function showAlert(type, message) {
    $ionicPopup.alert({
      title: type,
      template: message
    });
  }
});

app.controller('MainCtrl', function ($scope, $state, $rootScope, $http, $window, $ionicPopup, UserService) {
  var userID = $window.localStorage.getItem("userID");
  console.log(userID);
  if (userID === null) {
    $state.go("login");
  }

  // get all books
  UserService.getBooksDetails();

  // view books by id
  $scope.view_book = function (id) {
    console.log("id: " + id);
    UserService.viewBook(id);
    $state.go('view_book');
  };
 $scope.view_article = function (id) {
    console.log("id: " + id);
    UserService.viewArticle(id);
    $state.go('view_article');
  };

  // download preview
  $scope.downloadPreviewFunct = function (preview) {
    UserService.downloadPreview(preview);
  };


  $scope.slide_items = [{
    "p_id": "1",
    "p_name": "New Chicken Maharaja",
    "p_description": "Product Description",
    "p_image_id": "book1",
    "p_price": "183"
  },

    {
      "p_id": "2",
      "p_name": "Big Spicy Chicken Wrap",
      "p_description": "Product Description",
      "p_image_id": "book2",
      "p_price": "171"
    },

    {
      "p_id": "3",
      "p_name": "Big Spicy Paneer Wrap",
      "p_description": "Product Description",
      "p_image_id": "book3",
      "p_price": "167"
    }
  ];

  UserService.getArticles();

  $scope.article = function () {
    $state.go("all_article");
  };
  $scope.books = function () {
    $state.go("mainmenu");
  };

  $scope.logout = function () {
    UserService.logOut();
    return;
  };
});
