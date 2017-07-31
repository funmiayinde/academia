/**
 * Created by funmi on 3/17/17.
 */
var app = angular.module('starter.services', []);

app.service('UserService', function ($window, $rootScope, $state, $http, $ionicLoading, $ionicPopup, $cordovaFileTransfer) {
  var setUser = function (user_data) {
    $window.localStorage.setItem("userID", user_data.userID);
    $window.localStorage.setItem("name", user_data.name);
    $window.localStorage.setItem("email", user_data.userID);
  };
  var getUser = function () {
    var user_data = {
      userID: $window.localStorage.getItem("userID"),
      name: $window.localStorage.getItem("name"),
      email: $window.localStorage.getItem("email")
    };
    return user_data;
  };

  return {
    setUser: setUser,
    getUser: getUser,
    logOut: function () {
      $window.localStorage.removeItem("userID");
      $state.go("login");
    },
    getBooksDetails: function () {
      $http.get("http://localhost:4000/books/api/all_books").then(function (response) {
        $rootScope.books_details = response.data.data;
      });
    },
    viewBook: function (id) {
      $http.get("http://localhost:4000/books/api/view_book/" + id).then(function (response) {
        $rootScope.book_details = {};
        $rootScope.book_details.book_id = response.data.data._id;
        $rootScope.book_details.book_title = response.data.data.title;
        $rootScope.book_details.book_description = response.data.data.description;
        $rootScope.book_details.cover_path = response.data.data.cover_path;
        $rootScope.book_details.price = response.data.data.price;
        $rootScope.book_details.preview_path = response.data.data.preview_path;
        console.log("book detail: " + $rootScope.book_details.preview_path);
      });
    },
    viewArticle: function (id) {
      $http.get("http://localhost:4000/articles/api/view_article/" + id).then(function (response) {
        $rootScope.articles = {};
        $rootScope.articles._id = response.data.data._id;
        $rootScope.articles.title = response.data.data.title;
        $rootScope.articles.article = response.data.data.article;
        console.log("articles detail: " + $rootScope.articles.article);
      });
    },
    getArticles: function () {
      $http.get("http://localhost:4000/articles/api/all_articles").then(function (response) {
        // console.log("article :" + JSON.stringify(response.data.data));
        $rootScope.article_details = response.data.data;
        console.log("article :" + JSON.stringify($rootScope.article_details));

      });
    },

    downloadPreview: function (preview_url) {
      var fileTransfer = new FileTransfer();
      var fileName = preview_url.split('/').pop();
      var targetPath = cordova.file.externalRootDirectory + fileName;
      fileTransfer.download(preview_url, targetPath, function (response) {
          console.log("response from file: " + JSON.stringify(response));

        },
        function (error) {
          console.log("download error source " + error.source);
          console.log("download error target " + error.target);
          console.log("download error code" + error.code);
        });

      // var fileName = preview_url.split('/').pop();
      // var targetPath = cordova.file.externalRootDirectory + fileName;
      //
      // $cordovaFileTransfer.download(preview_url, targetPath, {}, true).then(function (response) {
      //   console.log("response from file: " + JSON.stringify(response));
      //   $ionicPopup.alert({
      //     title: "message",
      //     template: "your is download completed"
      //   });
      // }, function (err) {
      //   console.log("error from file :" + JSON.stringify(err));
      //   $ionicPopup.alert({
      //     title: "message",
      //     template: "your is download failed"
      //   });
      // }, function (progress) {
      //     $scope.downloadProgress = (progress.loaded / progress.total) * 100;
      //
      // })

    }

  };
});
