'use strict';

/**
 * @ngdoc overview
 * @name stockWebUiApp
 * @description
 * # stockWebUiApp
 *
 * Main module of the application.
 */

var clientOptions = {
  clientID: 'EweXXI9EHD44PQp38fjeZQqSRa3KTgwQ',
  domain: 'xiaomixin.auth0.com'
};

angular
  .module('costAnalysisApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.router',
    'auth0.lock',
    'auth0.auth0',
    'angular-jwt'
  ])
  .run(run)
  .config(config);

function config($httpProvider, angularAuth0Provider, jwtOptionsProvider, lockProvider) {

  angularAuth0Provider.init(angular.extend(clientOptions,
    {
      options: {
        theme: {
          logo: 'http://localhost:9000/images/user.png',
          primaryColor: "#b81b1c"
        }
      }

    }));

  lockProvider.init(clientOptions);


  jwtOptionsProvider.config({
    tokenGetter: function (options) {
      // Check for templates and return null to not attach the JWT
      if (options && options.url.substr(options.url.length - 5) == '.html') {
        return null;
      }
      return localStorage.getItem('id_token');
    },
    whiteListedDomains: ['localhost'],
    unauthenticatedRedirectPath: '/login'
  });

  $httpProvider.interceptors.push('jwtInterceptor');
}

run.$inject = ['$rootScope', 'authService', 'authManager', 'lock'];
function run($rootScope, authService, authManager, lock) {

  // Put the authService on $rootScope so its methods
  // can be accessed from the nav bar
  //$rootScope.authService = authService;

  // Register the authentication listener that is
  // set up in auth.service.js
  authService.authenticateAndGetProfile();


  // Use the authManager from angular-jwt to check for
  // the user's authentication state when the page is
  // refreshed and maintain authentication
  authManager.checkAuthOnRefresh();


  $rootScope.$safeApply = function safeApply(operation) {
    var phase = this.$root.$$phase;
    if (phase !== '$apply' && phase !== '$digest') {
      this.$apply(operation);
      return;
    }

    if (operation && typeof operation === 'function') {
      operation();
    }
  };

  $rootScope.$on('$stateChangeStart', function (event, nextRoute) {
    if (nextRoute.controller === 'AdminCtrl') {
      if (!isAdmin()) {
        alert('You are not allowed to see the Admin content');
        return event.preventDefault();
      }
    }
  });

  function isAdmin() {
    var userProfile = JSON.parse(localStorage.getItem('profile'));
    return userProfile && userProfile.app_metadata
      && userProfile.app_metadata.roles
      && userProfile.app_metadata.roles.indexOf('admin') > -1;
  }

}

