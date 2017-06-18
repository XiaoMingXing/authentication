'use strict';

/**
 * @ngdoc function
 * @name portalApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the portalApp
 */
angular.module('costAnalysisApp')
    .controller('LabCtrl', function () {
    })
    .controller('CloudWatchCtrl', function ($scope, $http, CommonService) {
        var CLOUD_WATCH_REST_URL = "cloud/cloudwatch/";
        $scope.alarms = [
            {}
        ];

        CommonService.get(GLOBAL_ENV.urlPrefix + CLOUD_WATCH_REST_URL + "alarms")
            .then(function (content) {
                console.log(content);
                if (!content && !content.length) {
                    $scope.alarms = content;
                }
            });
    });
