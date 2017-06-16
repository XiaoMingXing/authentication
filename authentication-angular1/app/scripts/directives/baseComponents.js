'use strict';
angular.module('costAnalysisApp')
  .directive('modal', function () {
    return {
      restrict: "E",
      transclude: true,
      template: '<div class="modal" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false"> <div class="modal-body">' +
      '</div></div>'
    }
  });
