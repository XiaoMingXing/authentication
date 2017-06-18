'use strict';

/**
 * @ngdoc function
 * @name portalApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the portalApp
 */
angular.module('costAnalysisApp')
  .controller('TCloudController', function ($scope) {

    $scope.datamodal = {
      applicationFile: '',
      testFile: ''
    };

    $scope.submit = function () {
      console.log('DataModal: ', $scope.datamodal);
    };


  });
