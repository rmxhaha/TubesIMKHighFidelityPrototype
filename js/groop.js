angular.module('groop-app', [])
  .controller('main-search',['$scope', function($scope) {
      $scope.type = "namakomunitas";
  }])
  .controller("group-popular-discussion",["$scope",function($scope){
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
