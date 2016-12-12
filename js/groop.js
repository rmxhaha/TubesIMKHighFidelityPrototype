var groop = angular.module('groop-app', ['ngRoute']);

groop.controller('nav',['$scope','$rootScope',function($scope, $rootScope){
  $rootScope.$on('user_login', function(user){
    $scope.logged_in = true;
  });

}]);

groop.config(function($routeProvider) {
     $routeProvider
         // route for the home page
         .when('/', {
             templateUrl : 'pages/main-search.html',
             controller  : 'main-search'
         })

         // route for the about page
         .when('/search', {
             templateUrl : 'pages/main-search-result.html',
             controller  : 'aboutController'
         })

         // route for the contact page
         .when('/contact', {
             templateUrl : 'pages/contact.html',
             controller  : 'contactController'
         });
 });

groop.controller('main-search',['$scope', function($scope) {
  $scope.type = "namakomunitas";
}]);

groop.controller("home-profile",["$scope",function($scope){
  $scope.posts = [
    {
      upvote : 121,
      poster_img : 'img/gambar.jpg',
      title : 'Rakit Komputer 2jt',
      content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nisi id ipsum auctor tempor a nec felis.',
      comment_count : 30,
      post_url : 'discussion2.html'
    },
    {
      upvote : 121,
      poster_img : 'img/gambar.jpg',
      title : 'Hibah Komputer',
      content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nisi id ipsum auctor tempor a nec felis.',
      comment_count : 30,
      post_url : 'discussion2.html'
    },
    {
      upvote : 121,
      poster_img : 'img/gambar.jpg',
      title : 'Rakit Komputer 2jt',
      content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nisi id ipsum auctor tempor a nec felis.',
      comment_count : 30,
      post_url : 'discussion2.html'
    },
  ];
}]);
