angular.module('costAnalysisApp')
    .directive('portalHeaderTrans', function () {
        return {
            restrict: "A",
            link: function ($scope, $element) {
                var button = $element.find(".dropdown button");
                var dropdown = $element.find(".dropdown ul");
                button.bind("click", function (event) {
                    dropdown.slideToggle();
                    event.stopPropagation();
                })
            },
            templateUrl: "../../../views/common/nav.html"
        }
    });
