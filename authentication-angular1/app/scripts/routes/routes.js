"use strict";

angular.module('costAnalysisApp')
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('users', {
      templateUrl: 'views/users/main.html',
      controller: 'UsersCtrl',
      url: "/users"
    });

    $stateProvider
      .state('home', {
        url: "/home",
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })


      .state('recruiter', {
        url: "/recruiter",
        templateUrl: 'views/recruiter/main.html',
        controller: 'RecruiterCtrl'
      })
      .state('recruiter.personalDetails', {
        url: "/personalDetails",
        templateUrl: 'views/recruiter/personalDetails.html',
        controller: 'PersonalDetailsCtrl'
      })
      .state('recruiter.occupations', {
        url: "/occupations",
        templateUrl: 'views/recruiter/occupations.html',
        controller: 'OccupationsCtrl'
      })
      .state('recruiter.applyRecords', {
        url: "/applyRecords",
        templateUrl: 'views/recruiter/applyRecords.html',
        controller: 'ApplyRecordsCtrl'
      })


      .state('users', {
        url: "/users",
        templateUrl: 'views/users/main.html',
        controller: 'UsersCtrl'
      })
      .state('lab', {
        url: "/lab",
        templateUrl: 'views/lab/lab.html',
        controller: 'LabCtrl',
        controllerAs: 'lab'
      }).state('lab.all', {
      url: "/all",
      templateUrl: 'views/lab/all.html'
    }).state('lab.ec2', {
      url: "/ec2",
      templateUrl: 'views/lab/ec2.html'
    }).state('lab.cloudwatch', {
      url: "/cloudwatch",
      templateUrl: 'views/lab/cloudwatch.html',
      controller: 'CloudWatchCtrl',
    })

      .state('articles', {
        url: "/articles",
        templateUrl: 'views/articles/articles.html',
        controller: 'ArticlesCtrl',
        controllerAs: 'articles'
      })
      .state('admin', {
        url: "/admin",
        templateUrl: 'views/admin/admin.html',
        controller: 'AdminCtrl'
      })
      .state('cost', {
        url: "/cost",
        templateUrl: 'views/cost-analysis.html',
        controller: 'CostAnalysisCtrl',
        controllerAs: 'costAnalysis'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/public/login.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'views/template/registerForm.html',
        controller: 'registerCtrl'
      })
      .state('logout', {
        url: '/logout',
        templateUrl: 'views/public/logout.html'
      });
  });
