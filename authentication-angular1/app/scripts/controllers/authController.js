'use strict';
angular.module('costAnalysisApp')
  .controller('loginCtrl', function ($scope, authService) {

    var vm = this;

    vm.authService = authService;

    vm.login = function () {
      authService.login(vm.username, vm.password, function (err) {
        if (err) {
          console.log("something went wrong: " + err.message);
        }
      });
    };

    vm.signup = function () {
      authService.signup(vm.username, vm.password, function (err) {
        if (err) {
          console.log("something went wrong: " + err.message);
        }
      });
    };

    vm.googleLogin = function () {
      authService.googleLogin(function (err) {
        if (err) {
          console.log("something went wrong: " + err.message);
        }
      });
    };


  })
  .controller('registerCtrl', function ($scope, $location, RegisterService, Spinner, validator, $cookieStore) {
    $scope.dataModel = {
      username: $cookieStore.get('username') || '',
      password: $cookieStore.get('password') || '',
      email: $cookieStore.get('email') || ''
    };
    validator.registerErrorListener($scope, {
      username: {
        methods: 'validateNotEmpty',
        dataModel: 'dataModel.username',
        action: true
      },
      email: {
        methods: ['validateNotEmpty', 'validateEmailPattern'],
        dataModel: 'dataModel.email',
        action: true
      },
      password: {
        methods: ['validateNotEmpty', {validateDuplicateOne: validateDuplicateOne}],
        dataModel: 'dataModel.password',
        action: true
      },
      confirmPassword: {
        methods: ['validateNotEmpty', {validateDuplicate: validateDuplicate}],
        dataModel: 'dataModel.confirmPassword',
        action: true
      }
    });

    function validateDuplicate(value) {
      var result = value === $scope.dataModel.password;
      if (result && !validator.isValid('password')) {
        validator.validate('password');
      }
      return result
    }

    function validateDuplicateOne(value) {
      var result = value === $scope.dataModel.confirmPassword;
      if (result && !validator.isValid('confirmPassword')) {
        validator.validate('confirmPassword');
      }
      return result;
    }

    $scope.validate = function (properties) {
      if (angular.isString(properties)) {
        properties = [properties];
      }
      validator.clearError(properties);
      validator.validate(properties);
    };

    $scope.register = function ($event) {
      $scope.validate(['username', 'email', 'password', 'confirmPassword']);
      if (!$scope.isValid) {
        return;
      }
      var target = $($event.target).parents('.modal-block');
      Spinner.show(target);
      RegisterService.register($scope.dataModel)
        .then(function (result) {
          if (result.status === 200) {
            $location.path('home');
          }
        })
        .finally(function () {
          Spinner.hide(target);
        });
    }
  });
