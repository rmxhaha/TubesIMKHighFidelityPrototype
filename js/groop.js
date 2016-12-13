var groop = angular.module('groop-app', ['ngRoute','luegg.directives']);

groop.run(function($rootScope) {
    $rootScope.user_admin = 0;
    $rootScope.user_have_joined = 1;
});

groop.controller('nav',['$scope','$rootScope',function($scope, $rootScope){
  $scope.logout = function(){
	  $rootScope.user_admin = 0;
    $scope.logged_in = false;
  }
  $scope.logged_in = false;
  $rootScope.$on('user_login', function(user){
    $scope.logged_in = true;
  });

}]);

groop.controller('group-nav',function($scope,$rootScope){
  $scope.outside_group = true;
  $scope.group_part = "asdf";
  $scope.user_admin = $rootScope.user_admin;
  $scope.user_have_joined =  $rootScope.user_have_joined;

  $rootScope.$on("group_view", function(event,group_name){
    $scope.group_part = group_name;
    $scope.outside_group = false;
  });

  $rootScope.$on( "$routeChangeStart", function(){
    if( !$scope.outside_group ){
      $scope.outside_group = true;
      $scope.group_part = "nothing to look here";
    }
    $scope.user_admin = $rootScope.user_admin;
    $scope.user_have_joined =  $rootScope.user_have_joined;
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
         .when('/group-wiki', {
             templateUrl : 'pages/group-wiki.html',
             controller  : 'group-wiki'
         })
         .when('/group-settings', {
             templateUrl : 'pages/group-settings.html',
             controller  : 'group-settings'
         })
         .when('/group-members', {
             templateUrl : 'pages/group-members.html',
             controller  : 'group-members'
         })
         .when('/group-members-admin', {
             templateUrl : 'pages/group-members-admin.html',
             controller  : 'group-members'
         })
         .when('/user-profile', {
             templateUrl : 'pages/user-profile.html',
             controller  : 'user-profile'
         })
         .when('/user-login', {
             templateUrl : 'pages/user-login.html',
             controller : 'user-login'
         })
         .when('/user-register', {
             templateUrl : 'pages/user-register.html',
             controller  : 'user-register'
         })
         .when('/user-home', {
             templateUrl : 'pages/user-home.html',
             controller  : 'user-home'
         })
         .when('/messages', {
             templateUrl : 'pages/messages.html',
             controller  : 'messages'
         })
 });
groop.controller('main-search',['$scope', function($scope) {
  $scope.type = "namakomunitas";
}]);

groop.controller('main-search-result',function($scope){
});
groop.controller('user-profile',function($scope){
});
groop.controller('user-register',function($scope,$rootScope){
  $scope.login = function(){
    $rootScope.$broadcast("user_login");
  }
});
groop.controller('user-login',function($scope,$rootScope){
  $scope.login = function(){
	$rootScope.user_admin = 1;
    $rootScope.$broadcast("user_login");
  }
});
groop.controller('user-home',function($scope){
	$scope.posts = [
    {
      upvote : 42,
      poster_img : 'img/pepe.jpg',
      title : 'Discussion : Rakit Komputer 2jt',
      content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nisi id ipsum auctor tempor a nec felis.',
      comment_count : 30,
      post_url : '#!/group-discussion'
    },
    {
      upvote : 150,
      poster_img : 'img/kitten.gif',
      title : 'Discussion : Hibah Komputer',
      content : 'Lorem ipsum auctor tempor a nec felis, consectetur adipiscing elit. In id nisi id.',
      comment_count : 30,
      post_url : '#!/group-discussion'
    },
    {
      upvote : 24,
      poster_img : 'img/kitten.gif',
      title : 'Discussion : 2x GTX 1080',
      content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nisi id ipsum auctor tempor a nec felis.',
      comment_count : 5,
      post_url : '#!/group-discussion'
    },
  ];
});

groop.controller('messages',function($scope){
  function make_random_msgs(name,n){
    var m = [];
    for( var i = n; i--; ){
      if( Math.random() < 0.5 ){
        m.push({
          image : "img/gambar.jpg",
          name : name,
          content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nisi id ipsum auctor tempor a nec felis."
        })
      }
      else {
        m.push({
          image : "img/kitten.gif",
          name : "Bimo",
          content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nisi id ipsum auctor tempor a nec felis."
        })
      }
    }
    return m;
  }

  $scope.current = {
    name : "Candra Ramsi",
    messages : [{
      image : "img/gambar.jpg",
      name : "rmxhaha",
      content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nisi id ipsum auctor tempor a nec felis."
    }]
  }
  $scope.select = function(user){
    if( $scope.current.o ) $scope.current.o.selected = 0;
    $scope.current.o = user;
    $scope.current.name = user.name;
    $scope.current.messages = make_random_msgs(user.name,20);
  }
  $scope.users = [
    {
      name : "Candra Ramsi",
      selected : true,
      image : "img/gambar.jpg"
    },
    {
      name : "Friska",
      selected : false,
      image : "img/gambar.jpg"
    },
    {
      name : "Verisky",
      selected : false,
      image : "img/gambar.jpg"
    }
  ];
  $scope.select($scope.users[0]);
  $scope.send = function(){
    if( $scope.form_message== "" ) return;
    $scope.current.messages.push({
      name : $scope.current.name,
      image : "img/gambar.jpg",
      content : $scope.form_message
    });
    $scope.form_message = "";
  }
});
groop.controller('group-event',function($scope,$rootScope){
  $rootScope.$broadcast('group_view','Event');

  $scope.user_admin = 1;
  $scope.user_have_joined = 1;

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
      content : "Gua mau ikutan nich",
      upvote : -1,
      bookmarked : false,
      replies : [
        {
          commenter : "Johan",
          content : "Apaan sih min bawel.",
          upvote : 1,
          bookmarked : false,
          replies : [
            {
              commenter : "Salimin",
              content : "Kecewa",
              upvote : 1,
              bookmarked : false,
              replies : []
            },

          ]
        },
        {
          commenter : "Candra",
          content : "Apaan sih min bawel.",
          upvote : 3,
          bookmarked : false,
          replies : [
            {
              commenter : "Salimin",
              content : "Kecewa",
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
groop.controller('group-discussion',function($scope,$rootScope){
  $rootScope.$broadcast('group_view','Discussion');

  $scope.user_admin = 1;
  $scope.user_have_joined = 1;

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

groop.controller("group-profile",["$scope","$rootScope",function($scope,$rootScope){
  $rootScope.$broadcast('group_view','Profile');

  $scope.user_admin = $rootScope.user_admin;
  $scope.user_have_joined =  $rootScope.user_have_joined;
  $rootScope.$on( "$routeChangeStart", function(){
    $scope.user_admin = $rootScope.user_admin;
    $scope.user_have_joined =  $rootScope.user_have_joined;
  });

  $scope.posts = [
    {
      upvote : 121,
      poster_img : 'img/doge.png',
      title : 'Rakit Komputer 2jt',
      content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nisi id ipsum auctor tempor a nec felis.',
      comment_count : 30,
      post_url : '#!/group-discussion'
    },
    {
      upvote : 40,
      poster_img : 'img/doge.png',
      title : 'Hibah Komputer',
      content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nisi id ipsum auctor tempor a nec felis.',
      comment_count : 50,
      post_url : '#!/group-discussion'
    },
    {
      upvote : 26,
      poster_img : 'img/pepe.jpg',
      title : 'SLI GTX 1080',
      content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nisi id ipsum auctor tempor a nec felis.',
      comment_count : 154,
      post_url : '#!/group-discussion'
    },
  ];
}]);

groop.controller("group-wiki",function($scope,$rootScope){
  $scope.user_admin = $rootScope.user_admin;
  $scope.user_have_joined =  $rootScope.user_have_joined;
  $rootScope.$on( "$routeChangeStart", function(){
    $scope.user_admin = $rootScope.user_admin;
    $scope.user_have_joined =  $rootScope.user_have_joined;
  });
  $rootScope.$broadcast('group_view','Wiki');
});

groop.controller("group-settings",function($scope,$rootScope){
  $rootScope.$broadcast('group_view','Settings');
  $scope.user_admin = $rootScope.user_admin;
  $scope.user_have_joined =  $rootScope.user_have_joined;
  $rootScope.$on( "$routeChangeStart", function(){
    $scope.user_admin = $rootScope.user_admin;
    $scope.user_have_joined =  $rootScope.user_have_joined;
  });
});

groop.controller("group-members",function($scope,$rootScope){
  $scope.user_admin = $rootScope.user_admin;
  $scope.user_have_joined =  $rootScope.user_have_joined;
  $rootScope.$on( "$routeChangeStart", function(){
    $scope.user_admin = $rootScope.user_admin;
    $scope.user_have_joined =  $rootScope.user_have_joined;
  });
  $rootScope.$broadcast('group_view','Members');
});
