"use strict";
angular.module('costAnalysisApp')
    .service('CommonService', function ($http) {
        return {
            get: function (url) {
                return $http({
                    method: 'GET',
                    url: url
                });
            }
        };
    })
    .service('Spinner', function ($compile) {
        return {
            show: function ($element) {
                $element = $element || $('body');
                if (!$element.find('spinner').length) {
                    $element
                        .append('<modal><img class="spinner" src="images/spinner.gif" width="50px" height="50px" /></modal>');
                    $compile($element)($element.scope());
                }
                $element.find(".modal").show();
            },
            hide: function ($element) {
                $element.find(".modal").hide();
            }
        }

    });
