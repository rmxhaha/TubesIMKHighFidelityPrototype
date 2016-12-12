var groop = angular.module('groop-app', ['ngRoute']);

groop.controller('nav',['$scope','$rootScope',function($scope, $rootScope){
  $scope.logout = function(){
    $scope.logged_in = false;
  }
  $scope.logged_in = true;
  $rootScope.$on('user_login', function(user){
    $scope.logged_in = true;
  });

}]);

groop.controller('group-nav',function($scope,$rootScope){
  $scope.in_group = true;
  $scope.group_part = "asdf";

  $rootScope.$on("group_view", function(group_name){
    $scope.group_part = group_name;
    $scope.in_group = true;
  });

  $rootScope.$on( "$routeChangeStart", function(){
    $scope.in_group = true;
    $scope.group_part = "nothing to look here";
  });
});

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
             controller  : 'main-search-result'
         })

         .when('/group-profile', {
             templateUrl : 'pages/group-profile.html',
             controller  : 'group-profile'
         })
         .when('/group-event', {
             templateUrl : 'pages/group-event.html',
             controller  : 'group-event'
         })
         .when('/group-discussion', {
             templateUrl : 'pages/group-discussion.html',
             controller  : 'group-discussion'
         })
         .when('/user-profile', {
             templateUrl : 'pages/user-profile.html',
             controller  : 'user-profile'
         })
 });

groop.controller('main-search',['$scope', function($scope) {
  $scope.type = "namakomunitas";
}]);

groop.controller('main-search-result',function($scope){
});
groop.controller('user-profile',function($scope){
});
groop.controller('group-event',function($scope){
});
groop.controller('group-discussion',function($scope){
  $scope.bookmark = function(comment){
    comment.bookmarked = true;
  }
  $scope.revertbookmark = function(comment){
    comment.bookmarked = false;
  }
  $scope.reply = function(comment,anonymous,m){
    var msg = {
      content : m,
      upvote : 0,
      bookmarked : false,
      replies : []
    };

    if( anonymous )
      msg['commenter'] = "Anonymous"
    else
      msg['commenter'] = "Bimo";

    console.log(msg);
    comment.replies.unshift(msg);
    comment.form_reply = false;
  }

  $scope.comment = function(anonymous,m){
    var msg = {
      content : m,
      upvote : 0,
      bookmarked : false,
      replies : []
    };

    if( anonymous )
      msg['commenter'] = "Anonymous"
    else
      msg['commenter'] = "Bimo";

    console.log(msg);
    $scope.comments.unshift(msg);
  }

  $scope.comments = [
    {
      commenter : "Salimin",
      content : "Komposisinya jelek harusnya bla bla bla",
      upvote : -1,
      bookmarked : false,
      replies : [
        {
          commenter : "Johan",
          content : "Apaan sih min bawel.",
          upvote : 1,
          bookmarked : false,
          replies : []
        },
        {
          commenter : "Candra",
          content : "Saya terima feedback nya",
          upvote : 3,
          bookmarked : false,
          replies : [
            {
              commenter : "Salimin",
              content : "Sama sama.",
              upvote : 1,
              bookmarked : false,
              replies : []
            },

          ]
        },
      ]
    }
  ];

});

groop.controller("group-profile",["$scope",function($scope){
  $scope.posts = [
    {
      upvote : 121,
      poster_img : 'img/gambar.jpg',
      title : 'Rakit Komputer 2jt',
      content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nisi id ipsum auctor tempor a nec felis.',
      comment_count : 30,
      post_url : '#!/group-discussion'
    },
    {
      upvote : 121,
      poster_img : 'img/gambar.jpg',
      title : 'Hibah Komputer',
      content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nisi id ipsum auctor tempor a nec felis.',
      comment_count : 30,
      post_url : '#!/group-discussion'
    },
    {
      upvote : 121,
      poster_img : 'img/gambar.jpg',
      title : 'Rakit Komputer 2jt',
      content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nisi id ipsum auctor tempor a nec felis.',
      comment_count : 30,
      post_url : '#!/group-discussion'
    },
  ];
}]);
