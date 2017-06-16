'use strict';

/**
 * @ngdoc function
 * @name portalApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the portalApp
 */
angular.module('costAnalysisApp')
  .controller('UsersCtrl', function ($scope, UserService) {

    $scope.init = function () {
      UserService.listUsers().then(function (res) {
        if (res.status === 200) {
          $scope.users = res.data;
        }
      });
    };

    $scope.addUser = function () {
      $scope.showAddUserFrom = true;
    };

    $scope.deleteUsers = function () {
      $scope.showAddUserFrom = false;
    };

    $scope.confirm = function () {
      UserService.saveUser($scope.dataModel)
        .then(function (res) {
          if (res.status === 200) {
            $scope.init();
          }
        });
    }
  });
