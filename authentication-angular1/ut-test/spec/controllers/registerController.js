'use strict';

describe('Controller: RegisterCtrl ->', function () {
  var $scope, RegisterCtrl, RegisterService, validator, $cookieStore, $location, Spinner;

  // load the controller's module
  beforeEach(module('costAnalysisApp'));
  // Initialize the controller and a mock $scope
  beforeEach(inject(function ($controller, _$rootScope_, _$location_, _$cookieStore_) {
    $scope = _$rootScope_.$new();
    $location = _$location_;
    $cookieStore = _$cookieStore_;
    RegisterService = jasmine.createSpyObj('RegisterService', ['register']);
    validator = jasmine.createSpyObj('validator', ['registerErrorListener', 'clearError', 'isValid', 'validate']);
    Spinner = jasmine.createSpyObj('Spinner', ['hide', 'show']);

    RegisterService.register.and.returnValue({
      then: function (callback) {
        callback({
          data: 1,
          status: 200
        });

        return {
          finally: function (func) {
            func();
          }
        }
      }
    });

    RegisterCtrl = $controller('registerCtrl', {
      '$scope': $scope,
      '$location': $location,
      'RegisterService': RegisterService,
      '$cookieStore': $cookieStore,
      'validator': validator,
      'Spinner': Spinner
    });

  }));

    it('should invoke clearError and real validate method', function () {
        //when
        $scope.validate("username");
        //then
        expect(validator.clearError).toHaveBeenCalled();
        expect(validator.validate).toHaveBeenCalled();
    });


  it("should not call register function when not valid", function () {
    //given
    var $event = {
      target: $("<div></div>")
    };
    $scope.isValid = false;
    //when
    $scope.register($event);

    //then
    expect(RegisterService.register).not.toHaveBeenCalled();
  });


  it('should call register function when is valid', function () {
    //given
    var child = $("<div class='child'></div>"), parent = $("<di class='model-block'></div>");
    parent.append(child);
    var $event = {
      target: child
    };
    $scope.isValid = true;
    //when
    $scope.register($event);

    //then
    expect(Spinner.show).toHaveBeenCalled();
    expect(RegisterService.register).toHaveBeenCalled();
    expect(Spinner.hide).toHaveBeenCalled();
  });
})
;
