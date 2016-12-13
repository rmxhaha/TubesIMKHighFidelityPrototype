var groop = angular.module('groop-app', ['ngRoute','luegg.directives']);

groop.run(function($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function() {
       $templateCache.removeAll();
    });

    $rootScope.groupInfo = [
      {
        name : "Komputer Bandung",
        description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nisi id ipsum auctor tempor a nec felis. Donec pulvinar facilisis mi ut dignissim. Quisque dapibus consequat erat, quis congue massa. Pellentesque quis porta dolor. Nam efficitur tempor nisi, vulputate blandit nunc sollicitudin non. Integer rutrum lorem fringilla gravida rhoncus. Aliquam ultrices justo a congue fermentum. Etiam libero lorem, mollis a augue vel, lacinia vestibulum velit. ",
        posts : [
          {
            upvote : 42,
            poster_img : 'img/pepe.jpg',
            title : 'Discussion : Rakit Komputer 2jt',
            content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nisi id ipsum auctor tempor a nec felis.',
            comment_count : 30,
            post_url : '#!/group-discussion/0/1'
          },
          {
            upvote : 150,
            poster_img : 'img/kitten.gif',
            title : 'Discussion : Hibah Komputer',
            content : 'Lorem ipsum auctor tempor a nec felis, consectetur adipiscing elit. In id nisi id.',
            comment_count : 30,
            post_url : '#!/group-discussion/0/1'
          },
          {
            upvote : 24,
            poster_img : 'img/kitten.gif',
            title : 'Discussion : 2x GTX 1080',
            content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nisi id ipsum auctor tempor a nec felis.',
            comment_count : 5,
            post_url : '#!/group-discussion/0/1'
          },
        ],
        events : [
          {
            name : "Rakit Komputer Bareng - 10 Juni 2016",
            url : "#!/group-event/0/0"
          },
          {
            name : "Rakit Komputer Bareng - 12 Juni 2016",
            url : "#!/group-event/0/0"
          },
          {
            name : "Rakit Komputer Bareng - 14 Juni 2016",
            url : "#!/group-event/0/0"
          },
        ],
        is_admin : 0,
        have_joined : 0
      },
      {
        name : "Beauty Bandung",
        description : "Beauty Product yang bisa dibeli di bandung.",
        posts : [],
        events : [],
        is_admin : 1,
        have_joined : 1
      }
    ]

    $rootScope.discussionInfo = [
      // 0
      [
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
      ]
      // 1
      ,
      [
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
      ]
    ]
});

groop.controller('nav',['$scope','$rootScope',function($scope, $rootScope){
  $scope.logout = function(){
    $scope.logged_in = false;
  }
  $scope.logged_in = false;
  $rootScope.$on('user_login', function(user){
    $scope.logged_in = true;
  });

}]);

groop.controller('group-nav',function($scope,$rootScope,$routeParams,$location){
  $scope.outside_group = true;
  $scope.group_part = "asdf";
  $scope.group_name = "lalal";
  if( $routeParams.groupName ){
    $scope.user_admin = $rootScope.groupInfo[ $routeParams.groupName ].is_admin;
    $scope.user_have_joined = $rootScope.groupInfo[ $routeParams.groupName ].have_joined;
  }

  $rootScope.$on("group_view", function(event,group_part){
    $scope.group_part = group_part;
    $scope.outside_group = false;
    $scope.group_name = $rootScope.groupInfo[ $routeParams.groupName ].name;
    $scope.group_id = $routeParams.groupName;

    $scope.user_admin = $rootScope.groupInfo[ $routeParams.groupName ].is_admin;
    $scope.user_have_joined = $rootScope.groupInfo[ $routeParams.groupName ].have_joined;
  });

  $rootScope.$on( "$routeChangeStart", function(){
    if( !$scope.outside_group ){
      $scope.outside_group = true;
      $scope.group_part = "nothing to look here";
    }
  });

  $scope.join = function(){
    $scope.user_have_joined = 1;
    $rootScope.groupInfo[ $routeParams.groupName ].have_joined = 1;
    $location.path("/user-login");
  }


});

groop.config(function($routeProvider) {
     $routeProvider
         // route for the home page
         .when('/', {
             templateUrl : 'pages/main-search.html',
             controller  : 'main-search'
         })
         .when('/search', {
             templateUrl : 'pages/main-search-result.html',
             controller  : 'main-search-result'
         })
         .when('/search-not-found', {
             templateUrl : 'pages/main-search-result-not-found.html'
         })

         .when('/group-profile/:groupName', {
             templateUrl : 'pages/group-profile.html',
             controller  : 'group-profile'
         })
         .when('/group-event/:groupName/:id', {
             templateUrl : 'pages/group-event.html',
             controller  : 'group-event'
         })
         .when('/group-discussion/:groupName/:id', {
             templateUrl : 'pages/group-discussion.html',
             controller  : 'group-discussion'
         })
         .when('/group-wiki/:groupName', {
             templateUrl : 'pages/group-wiki.html',
             controller  : 'group-wiki'
         })
         .when('/group-settings/:groupName', {
             templateUrl : 'pages/group-settings.html',
             controller  : 'group-settings'
         })
         .when('/group-members/:groupName', {
             templateUrl : 'pages/group-members.html',
             controller  : 'group-members'
         })
           .when('/group-members-admin/:groupName', {
             templateUrl : 'pages/group-members-admin.html',
             controller  : 'group-members'
         })
         .when('/group-create', {
             templateUrl : 'pages/group-create.html',
             controller  : 'group-create'
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
         .when('/add-event', {
             templateUrl : 'pages/add-event.html',
             controller  : 'add-event'
         })
 });

groop.controller("add-event",["$scope","$rootScope",function($scope,$rootScope){
  $rootScope.$broadcast('group_view','Add Event');
  $scope.user_admin = $rootScope.groupInfo[ $routeParams.groupName ].is_admin;
  $scope.user_have_joined = $rootScope.groupInfo[ $routeParams.groupName ].have_joined;

  $rootScope.$on( "$routeChangeStart", function(){
    $scope.user_admin = $rootScope.groupInfo[ $routeParams.groupName ].is_admin;
    $scope.user_have_joined = $rootScope.groupInfo[ $routeParams.groupName ].have_joined;
  });

}]);

groop.controller('main-search',['$scope','$location', function($scope,$location) {
  $scope.type = "namakomunitas";
  $scope.search = function(){
    if( $scope.searchText == "Beauty" ){
      $location.path("/search-not-found");
    }
    else {
      $location.path("/search");
    }
  }
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
//	   $rootScope.user_admin = 1;
     $rootScope.$broadcast("user_login");
  }
});

groop.controller('user-home',function($scope,$rootScope){
	$scope.posts = $rootScope.groupInfo[0].posts;
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
groop.controller('group-event',function($scope,$rootScope,$routeParams){
  $rootScope.$broadcast('group_view','Event');

  $scope.user_admin = $rootScope.groupInfo[ $routeParams.groupName ].is_admin;
  $scope.user_have_joined = $rootScope.groupInfo[ $routeParams.groupName ].have_joined;

  $rootScope.$on( "$routeChangeStart", function(){
    $scope.user_admin = $rootScope.groupInfo[ $routeParams.groupName ].is_admin;
    $scope.user_have_joined = $rootScope.groupInfo[ $routeParams.groupName ].have_joined;
  });

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

  $scope.comments = $rootScope.discussionInfo[$routeParams.id];

});
groop.controller('group-discussion',function($scope,$rootScope,$routeParams){
  $rootScope.$broadcast('group_view','Discussion');

  $scope.user_admin = $rootScope.groupInfo[ $routeParams.groupName ].is_admin;
  $scope.user_have_joined = $rootScope.groupInfo[ $routeParams.groupName ].have_joined;

  $rootScope.$on( "$routeChangeStart", function(){
    $scope.user_admin = $rootScope.groupInfo[ $routeParams.groupName ].is_admin;
    $scope.user_have_joined = $rootScope.groupInfo[ $routeParams.groupName ].have_joined;
  });

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

  $scope.comments = $rootScope.discussionInfo[$routeParams.id];

});

groop.controller("group-profile",["$scope","$rootScope","$routeParams",function($scope,$rootScope,$routeParams){
  $rootScope.$broadcast('group_view','Profile');

  $scope.user_admin = $rootScope.user_admin;
  $scope.user_have_joined =  $rootScope.user_have_joined;
  $rootScope.$on( "$routeChangeStart", function(){
    $scope.user_admin = $rootScope.user_admin;
    $scope.user_have_joined =  $rootScope.user_have_joined;
  });

  $scope.posts = $rootScope.groupInfo[$routeParams.groupName].posts;
  $scope.events = $rootScope.groupInfo[$routeParams.groupName].events;
  $scope.description = $rootScope.groupInfo[$routeParams.groupName].description;
}]);

groop.controller("group-wiki",function($scope,$rootScope,$routeParams){
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

groop.controller("group-create", function($scope,$rootScope,$location){
  $scope.create_group = function(){
    $location.path("/group-profile/1")
  };
});
