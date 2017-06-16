'use strict';
angular.module('costAnalysisApp')
  .service('UserService', function ($http, Constants) {
    return {
      listUsers: function () {
        return $http({
          method: 'GET',
          url: Constants.SERVICE_URLS.LIST_USER_URL
        });
      },
      saveUser: function (user) {
        return $http({
          method: 'POST',
          data: user,
          url: Constants.SERVICE_URLS.LIST_USER_URL
        });
      }
    };
  });
