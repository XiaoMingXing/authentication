'use strict';

/**
 * @ngdoc function
 * @name portalApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the portalApp
 */
angular.module('costAnalysisApp')
  .controller('HomeCtrl', ['$scope', '$location', 'LoginService', 'messageCN', '$cookieStore', 'authService',
    function ($scope, $location, LoginService, messageCN, $cookieStore, authService) {
      $scope.navItems = messageCN.nav_items;
      $scope.navIcons = messageCN.nav_icons;

      $scope.getLoginState = function () {
        return $cookieStore.get('isLogged');
      };
      $scope.clearLoginState = function () {
        return $cookieStore.remove('isLogged');
      };

      $scope.linkAccount = function () {
        authService.linkAccount()
          .then(function (profile) {
            $scope.profile = profile;
            refreshIdentities();
          })
      };

      function refreshIdentities() {
        $scope.profile.identities.shift();
        $scope.identities = $scope.profile.identities;
      }

      $scope.unLinkAccount = function (identity) {
        authService.unLinkAccount(identity).then(function (result) {
          console.log(result);
        });
      };

    }]);
