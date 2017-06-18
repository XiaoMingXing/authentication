'use strict';
angular.module('costAnalysisApp')
  .service('authServiceSimple', function (lock, authManager, $location) {

    function login() {
      // lock.show();
      $location.path('login');
    }

    function logout() {
      localStorage.removeItem('id_token');
      authManager.unauthenticate();
    }

    function registerAuthenticationListener() {
      lock.on('authenticated', function (authResult) {
        localStorage.setItem('id_token', authResult.idToken);
        authManager.authenticate();
      })
    }

    return {
      login: login,
      logout: logout,
      registerAuthenticationListener: registerAuthenticationListener
    }
  })
  .service('authService', function ($q, $location, $http, angularAuth0, lock, authManager) {
    var userProfile = JSON.parse(localStorage.getItem('profile')) || null;
    var deferredProfile = $q.defer();
    if (userProfile) {
      deferredProfile.resolve(userProfile);
    }

    function login(username, password, callback) {
      angularAuth0.login({
        connection: 'Username-Password-Authentication',
        responseType: 'token',
        email: username,
        password: password,
      }, callback);
    }

    function signup(username, password, callback) {
      angularAuth0.signup({
        connection: 'Username-Password-Authentication',
        responseType: 'token',
        email: username,
        password: password
      }, callback);
    }

    function googleLogin(callback) {
      angularAuth0.login({
        connection: 'google-oauth2',
        responseType: 'token'
      }, callback);
    }

    function logout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      authManager.unauthenticate();
    }

    function authenticateAndGetProfile() {
      var result = angularAuth0.parseHash(window.location.hash);

      if (result && result.idToken) {
        localStorage.setItem('id_token', result.idToken);
        authManager.authenticate();
        angularAuth0.getProfile(result.idToken, function (error, profileData) {
          if (error) {
            console.log(error);
          }
          localStorage.setItem('profile', JSON.stringify(profileData));
          $location.path('/home');
        });
      } else if (result && result.error) {
        alert('error: ' + result.error);
      }
    }

    function getProfileDeferred() {
      return deferredProfile.promise;
    }

    function linkAccount() {
      try {
        var profile = JSON.parse(localStorage.getItem('profile'));
        var token = localStorage.getItem('id_token');
      } catch (e) {
        return false;
      }

      var options = {
        rememberLastLogin: false,
        auth: {
          redirect: false,
          params: {
            scope: 'openid'
          }
        }
      };
      var lockLink = new Auth0Lock(clientOptions.clientID, clientOptions.domain, options);
      var deferred = $q.defer();

      lockLink.on('authenticated', function (authResult) {
        // do linking accounts
        $http({
          method: 'POST',
          url: 'https://' + clientOptions.domain + '/api/v2/users/' + profile.user_id + '/identities',
          headers: {
            Authorization: 'Bearer ' + token
          },
          data: {
            link_with: authResult.idToken
          }
        }).then(function () {
          lockLink.hide();
          lock.getProfile(token, function (error, profile) {
            if (!error) {
              localStorage.setItem('profile', JSON.stringify(profile));
              deferred.resolve(profile);
            } else {
              deferred.reject(error);
            }
          });
        })
      });

      lockLink.show();
      return deferred.promise;
    }

    function unlinkAccount(identity) {
      try {
        var profile = JSON.parse(localStorage.getItem('profile'));
        var token = localStorage.getItem('id_token');
      } catch (e) {
        return false;
      }

      var deferred = $q.defer();

      $http({
        method: 'DELETE',
        url: 'https://' + clientOptions.domain + '/api/v2/users/' + profile.user_id + '/identities/' + identity.provider + '/' + identity.user_id,
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(function () {
        lock.getProfile(token, function (error, profile) {
          if (!error) {
            localStorage.setItem('profile', JSON.stringify(profile));
            deferred.resolve(profile);
          } else {
            deferred.reject(error);
          }
        });
      });
      return deferred.promise;
    }

    return {
      login: login,
      logout: logout,
      authenticateAndGetProfile: authenticateAndGetProfile,
      signup: signup,
      googleLogin: googleLogin,
      getProfileDeferred: getProfileDeferred,
      linkAccount: linkAccount,
      unLinkAccount: unlinkAccount
    }
  })
  .service('LoginService', function ($http, $cookieStore, Constants) {
    return {
      login: function (user) {
        return $http({
          method: 'POST',
          data: user,
          url: Constants.SERVICE_URLS.LOGIN_URL
        });
      },
      setUserInfoInCookie: function (user) {
        $cookieStore.put('user', user);
      },
      removeUserInfoInCookie: function () {
        $cookieStore.remove('user');
      }
    };
  })
  .service('RegisterService', function ($http, Constants) {
    return {
      register: function (user) {
        return $http({
          method: 'POST',
          data: user,
          url: Constants.SERVICE_URLS.REGISTER_URL
        });
      }
    };
  });
