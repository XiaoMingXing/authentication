'use strict';

/**
 * @ngdoc function
 * @name stockWebUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the stockWebUiApp
 */
angular.module('costAnalysisApp')
    .controller('CostAnalysisCtrl', function ($scope, $http, Constants) {
        $scope.labels = [];
        $scope.data = [];
        $scope.series = ['Service Cost'];

        if (!$scope.labels.length) {
            $http
                .get(Constants.SERVICE_URLS.SERVICE_COST_STATISTIC)
                .then(function (content) {
                    if (content.status === 200 && angular.isArray(content.data)) {
                        var dataArray = [];
                        content.data.forEach(function (item) {
                            $scope.labels.push(item.service_name);
                            dataArray.push(item.cost);
                        });
                        $scope.data.push(dataArray);
                    }
                });
        }


    });
