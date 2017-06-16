'use strict';
angular.module('costAnalysisApp')
  .directive('loginForm', function () {
    return {
      restrict: "E",
      templateUrl: "../../views/template/loginForm.html",
      controller: ['$scope', '$attrs', '$location', 'LoginService', 'validator', 'Spinner', '$cookieStore', 'authService',
        function ($scope, $attrs, $location, loginService, validator, Spinner, $cookieStore, authService) {
          $scope.dataModel = {
            username: $cookieStore.get('username') || '',
            password: $cookieStore.get('password') || '',
            isRemember: $cookieStore.get('isRemember') || false
          };

          $scope.init = function () {

          };

          $scope.login = function ($event) {
            $scope.validate(['username', 'password']);
            if (!$scope.isValid) {
              return;
            }
            $scope.auth0login($scope.dataModel);
          };

          function localLogin(dataModel) {
            loginService.login(dataModel)
              .then(function (result) {
                if (result.data.data) {
                  $location.path("users");
                }
                else {
                  $scope.loginFailed = true;
                }
              });
          }

          $scope.auth0login = function (dataModel) {
            authService.login(dataModel.email, dataModel.password, function (err) {
              if (err) {
                console.log("something went wrong: " + err.message);
              } else {
                $location.path('home');
              }
            });
          };

          $scope.auth0logout = function () {

          };

          $scope.auth0googlelogin = function () {

          };

          validator.registerErrorListener($scope, {
            email: {
              methods: ['validateNotEmpty', 'validateEmailPattern'],
              dataModel: 'dataModel.email',
              action: true
            },
            password: {
              methods: 'validateNotEmpty',
              dataModel: 'dataModel.password',
              action: true
            }
          });

          $scope.validate = function (properties) {
            if (angular.isString(properties)) {
              properties = [properties];
            }
            validator.clearError(properties);
            validator.validate(properties);
          };
        }]
    }
  });
