'use strict';

/**
 * @ngdoc function
 * @name portalApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the portalApp
 */
angular.module('costAnalysisApp')
  .controller('NavController', function ($scope, $route, messageCN, authService, authManager, authServiceSimple) {
    $scope.navItems = [
      {text: "主页", state: "home"},
      {text: "用户管理", state: "users"},
      {text: "招聘SaaS", state: "recruiter"},
      {text: "博客管理", state: "articles"},
      {text: "后台管理", state: "admin"}
    ];
    $scope.navIcons = messageCN.nav_icons;

    $scope.profile = {};
    authService.getProfileDeferred().then(function (profile) {
      $scope.profile = profile;
    });

    $scope.login = function () {
      authServiceSimple.login();
    };

    $scope.logout = function () {
      localStorage.removeItem('id_token');
      authManager.unauthenticate()
    }
  });
