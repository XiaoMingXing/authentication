'use strict';
angular.module('costAnalysisApp')
    .constant('errorMessages', {
        usernameNotEmptyErrorMsg: "Username should not be empty.",
        confirmPasswordNotEmptyErrorMsg: "Confirm password should not be empty.",
        confirmPasswordDuplicateErrorMsg: "Confirm password should not be same as password.",

        emailNotEmptyErrorMsg: "Email should not be empty.",
        emailEmailPatternErrorMsg: "Please input valid email address",
        passwordNotEmptyErrorMsg: "Password should not be empty.",
        passwordDuplicateOneErrorMsg: "Password should not be same as confirm password."
    })
    .
    factory('validator', ['errorMessages', 'action', '$timeout', function (errorMessages, action) {
        var currentScope = null, validateConfig = null, validateResult = {}, isValids = {};
        var patterns = {
            numberPattern: /\d/,
            onlyNumberPattern: /^\d{0,3}$/,
            onlyFloatPattern: function (pricision) {
                return new RegExp('^(\\d+\\.?\\d{0,' + (pricision - 1) + '})$');
            },
            onlyFloatCharPattern: /^[\d|\.]$/,
            onlyDatePattern: /^\d{0,2}\/?\d{0,2}\/?\d{0,3}$/,
            restrictDatePattern: /^(\d|\/)$/,
            exceptNumberPattern: /[^\d]/,
            alphabetPattern: /^[A-Za-z]+$/,
            nameInputPattern: /^[A-Za-z0-9\-'_."]$/,
            userNamePattern: /^[a-zA-Z-'\s]*$/,
            datePattern: /^\d{2}\/\d{2}\/\d{4}$/,
            emailPattern: /^((\s)*[A-Za-z0-9])?[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,}(\s)*)$/
        };
        var validateFns = {
            onlyNumber: function (value) {
                return patterns.onlyNumberPattern.test(value);
            },
            onlyFloat: function (value, pricision) {
                if (!pricision) {
                    return patterns.onlyFloatCharPattern.test(value);
                }
                //when the float pricision is 2, we validate 1
                return patterns.onlyFloatPattern(pricision).test(value);
            },
            onlyDate: function (value) {
                return patterns.onlyDatePattern.test(value);
            },
            onlyAlphabet: function (value, type) {
                return patterns.alphabetPattern.test(value);
            },
            restrictDate: function (value) {
                return patterns.restrictDatePattern.test(value);
            },
            restrictName: function (value) {
                return !patterns.nameInvalidInputPattern.test(value);
            },
            validate: function (values, validateType) {
                return this[validateType](value);
            },
            regex: patterns
        };
        var commonFns = {
            formatDate: function (current) {
                var parts = current.split("-");
                return new Date(parts[0], parts[1] - 1, parts[2]);
            }
        };
        var normalValidateFns = {
            validateNotEmpty: function (current) {
                if (parseFloat(current) === 0) {
                    return false;
                }
                return !!current;
            },
            validateNotFalse: function (current) {
                return !!current;
            },
            validateEmailPattern: function (current) {
                return patterns.emailPattern.test(current);
            },
            validateRange: function (current, expect) {
                var result = {less: true, more: true};
                if (!angular.isDate(current)) {
                    current = commonFns.formatDate(current);
                }
                if (current < expect.less) {
                    result.less = false;
                }
                if (current > expect.more) {
                    result.more = false;
                }
                return result;
            },
            validateLength: function (current, expect) {
                return current.length <= expect;
            },
            validateLengthEqual: function (current, expect) {
                return !!current && (current.length == parseInt(expect));
            },
            validateEqual: function (current, expect) {
                return current === expect;
            },
            validateNoMoreThan: function (current, expect) {
                return current <= expect;
            },
            validateNoLessThan: function (current, expect) {
                return current >= expect;
            },
            validateNameFormat: function (current) {
                return patterns.userNamePattern.test(current) && current.length <= 50;
            },
            validateLastNameLength: function (current) {
                return current.length >= 2;
            }
        };
        var valueExtractFns = {
            extractArrayValues: function (propName, datamodel, validRowKeys) {
                var values = [];
                for (var index = 0; index < datamodel.length; index++) {
                    var datarow = datamodel[index];
                    if ((datarow[validRowKeys[0]] && !datarow[validRowKeys[1]]) || validRowKeys === "ALL") {
                        if (datarow.hasOwnProperty(propName)) {
                            values.push(datarow[propName]);
                        }
                    }
                }
                return values;
            }
        };
        return {
            regexValidateFns: validateFns,
            normalValidateFns: normalValidateFns,
            supportFns: {
                getDataModel: function (scope, dataModelStr) {
                    if (dataModelStr.indexOf(".") != -1) {
                        var temp = scope;
                        var parts = dataModelStr.split(".");
                        for (var index = 0; index < parts.length; index++) {
                            var part = parts[index];
                            temp = temp[part];
                        }
                        return temp;
                    } else {
                        return scope[dataModelStr];
                    }
                },
                getNeedValidateValues: function (propName, dataModelStr, validRowKey) {
                    var values = [], datamodel = this.getDataModel(currentScope, dataModelStr);
                    if (propName === 'total') {
                        values.push(currentScope[propName]);
                        return values;
                    }
                    if (propName === 'rows') {
                        return [datamodel];
                    }
                    if (angular.isArray(datamodel)) {
                        return valueExtractFns.extractArrayValues(propName, datamodel, validRowKey);
                    }
                    if (angular.isObject(datamodel)) {
                        return datamodel[propName];
                    }
                    return datamodel;
                },
                getFnName: function (fn) {
                    if (angular.isObject(fn)) {
                        return _.keys(fn) && _.keys(fn)[0];
                    } else if (angular.isFunction(fn)) {
                        var matches = fn.toString().match(/function ([^\(]+)/);
                        if (matches && matches.length) {
                            return matches[1];
                        }
                    } else {
                        return fn;
                    }
                },
                handleFnNames: function (fnNames) {
                    var result = [];
                    for (var index = 0; index < fnNames.length; index++) {
                        var fnName = this.getFnName(fnNames[index]);
                        result[index] = fnName;
                    }
                    return result;
                }
            },
            getExpectedByFnName: function (propName, fnName, config) {
                if (fnName.indexOf('Length') !== -1) {
                    return config[propName + 'Length'];
                } else if (fnName.indexOf('Equal') !== -1) {
                    return config[propName + 'Equal'];
                } else if (fnName.indexOf('NoMoreThan') !== -1) {
                    return config[propName + 'NoMoreThan'];
                } else if (fnName.indexOf('NoLessThan') !== -1) {
                    return config[propName + 'NoLessThan'];
                } else if (fnName.indexOf('Range') !== -1) {
                    return {
                        less: config[propName + 'Min'],
                        more: config[propName + 'Max']
                    };
                }
                return fnName;
            },
            validateProp: function (needValidateProp) {
                var thisValidateConfig = validateConfig[needValidateProp];
                if (!thisValidateConfig) {
                    return;
                }
                if (angular.isString(thisValidateConfig)) {
                    thisValidateConfig = {methods: [thisValidateConfig]};
                }
                if (angular.isArray(thisValidateConfig)) {
                    thisValidateConfig = {methods: thisValidateConfig};
                }
                var values = this.supportFns.getNeedValidateValues(needValidateProp, thisValidateConfig.dataModel ||
                    'datamodel', thisValidateConfig.ValidateRow || validateConfig.ValidateRow);
                if (!angular.isArray(values)) {
                    values = [values];
                }
                var isThisValid = true;
                for (var index = 0; index < values.length; index++) {
                    isThisValid = this.validateValue(values[index], needValidateProp, index, thisValidateConfig);
                    if (!isThisValid) {
                        break;
                    }
                }
                if (thisValidateConfig.action) {
                    if (!angular.isString(thisValidateConfig.action)) {
                        thisValidateConfig.action = 'toggleClass';
                    }
                    action[thisValidateConfig.action](needValidateProp, isThisValid,
                        this.supportFns.handleFnNames(thisValidateConfig.methods), currentScope);
                }
                return isThisValid;
            },
            validateValue: function (value, propName, valueIndex, config) {
                var isThisValid = true;
                if (!config.methods) {
                    return isThisValid;
                }
                if (!angular.isArray(config.methods)) {
                    config.methods = [config.methods];
                }
                for (var nestIndex = 0; nestIndex < config.methods.length; nestIndex++) {
                    if (!isThisValid) {
                        return;
                    }
                    var fn = config.methods[nestIndex], fnName = this.supportFns.getFnName(fn);
                    if (angular.isObject(fn)) {
                        fn = fn[fnName];
                    } else if (angular.isString(fn)) {
                        fn = normalValidateFns[fn];
                    }
                    if (!fn) {
                        continue;
                    }
                    var isValid = fn.call(currentScope, value,
                        this.getExpectedByFnName(propName, fnName, config));
                    validateResult[propName + "_" + valueIndex + "_" + fnName] = isValid;
                    if (!isValid || isValid.less === false || isValid.more === false) {
                        isThisValid = false;
                        break;
                    }
                }
                return isThisValid;
            },
            validate: function (needValidateProps) {
                validateResult = {};
                if (!angular.isArray(needValidateProps)) {
                    needValidateProps = [needValidateProps];
                }
                for (var index = 0; index < needValidateProps.length; index++) {
                    var isThisValid = this.validateProp(needValidateProps[index]);
                    isValids[needValidateProps[index]] = isThisValid;
                }
                var tempErrors = angular.copy(currentScope.validatorsErrors);
                //check result and set error msg
                this.handleValidateResult(tempErrors);
                //filter same meaning errors
                this.filterSameErrors(tempErrors);
                currentScope.validatorsErrors = null;
                currentScope.validatorsErrors = tempErrors;
                currentScope.$safeApply();
            },
            handleValidateResult: function (tempErrors) {
                for (var validName in validateResult) {
                    this.handleResult(tempErrors, validateResult[validName], validName.split("_"));
                }
            },
            filterSameErrors: function (errors) {
                //filter same kind of errors
                for (var errorName in errors) {
                    if (!patterns.numberPattern.test(errorName)) {
                        continue;
                    }
                    errors[errorName.replace(patterns.numberPattern, '')] =
                        errors[errorName];
                    delete errors[errorName];
                }
            },
            resetErrors: function () {
                currentScope.isValid = true;
                currentScope.validatorsErrors = {};
            },
            clearError: function (keys) {
                if (!keys) {
                    return;
                }
                if (!angular.isArray(keys)) {
                    keys = [keys];
                }
                keys.forEach(function (key) {
                    for (var errorName in currentScope.validatorsErrors) {
                        if (errorName.indexOf(key) !== -1) {
                            delete currentScope.validatorsErrors[errorName];
                            isValids[key] = true;
                        }
                    }
                });
                currentScope.$safeApply();
            },
            isValid: function (propNames) {
                if (!angular.isArray(propNames)) {
                    return isValids[propNames] !== false;
                }
                return _.filter(propNames, function (propName) {
                    return isValids[propName] === false;
                }).length === 0;

            },
            registerErrorListener: function ($scope, config) {
                if (!angular.isObject(config)) {
                    throw new Error('please pass valid config object!');
                }
                currentScope = $scope;
                if (!validateConfig && !angular.equals(config, validateConfig)) {
                    validateConfig = config;
                } else {
                    for (var key in config) {
                        validateConfig[key] = config[key];
                    }
                }
                if (!$scope.validatorsErrors) {
                    $scope.validatorsErrors = {};
                }
                if (!$scope.isValid) {
                    $scope.isValid = true;
                }
                $scope.$watch('validatorsErrors', function (newErrors, oldErrors, scope) {
                    for (var errorName in newErrors) {
                        if (newErrors[errorName]) {
                            scope.isValid = false;
                            return;
                        }
                    }
                    scope.isValid = true;
                }, true);
            },
            clearErrorClass: function (inputName) {
                var input = $("input[name='" + inputName + "']");
                if (input.length) {
                    input.parent().removeClass('no-error');
                    input.parent().removeClass('has-error');
                }
            },
            handleResult: function (tempErrors, singleResult, parts) {
                var errorMsgName = parts[0] + parts[1] +
                        parts[2].replace('validate', '') + 'ErrorMsg',
                    msgNameWithNumber = errorMsgName.replace(patterns.numberPattern, "");
                if (angular.isObject(singleResult)) {
                    for (var key in singleResult) {
                        errorMsgName = parts[0] + parts[1] + key.toUpperCase().substring(0, 1) +
                            key.substring(1) + 'ErrorMsg';
                        msgNameWithNumber = errorMsgName.replace(patterns.numberPattern, "");
                        if (!singleResult[key]) {
                            tempErrors[errorMsgName] = errorMessages[msgNameWithNumber];
                            currentScope.isValid = false;
                        } else {
                            delete tempErrors[msgNameWithNumber];
                        }
                    }
                } else if (!singleResult) {
                    tempErrors[errorMsgName] = errorMessages[msgNameWithNumber];
                    currentScope.isValid = false;
                } else {
                    delete tempErrors[msgNameWithNumber];
                }
            }
        };
    }])
    .factory('action', ["$compile", function ($compile) {
        return {
            restrictInput: function (modelCtrl, value) {
                value = value.substring(0, value.length - 1);
                modelCtrl.$setViewValue(value);
                modelCtrl.$render();
            },
            getFnName: function (fn) {
                var matches = fn.toString().match(/function ([^\(]+)/);
                if (matches && matches.length) {
                    return matches[1];
                }
            },
            appendToErrorDiv: function (propName, isValid, fnNames, currentScope) {
                var input = $("input[name='" + propName + "']"),
                    errorContainer = $("." + propName + "ErrorMsgs");
                if (input.length) {
                    if (isValid) {
                        input.removeClass('ssp-is-invalid');
                    } else {
                        input.addClass('ssp-is-invalid');
                    }
                }
                if (fnNames && fnNames.length) {
                    fnNames.forEach(function (fnName) {
                        var errorName = propName + fnName.replace('validate', '') + 'ErrorMsg';
                        if (!errorContainer.find("." + errorName).length) {
                            errorContainer.append(angular.element('<span class="sg-Validation-errorMessage"></span>')
                                .attr('ng-bind', 'validatorsErrors.' + errorName)
                                .addClass(errorName));
                        }
                    });
                    $compile(errorContainer)(currentScope);
                }
            },
            toggleClass: function (propName, isValid, fnNames, currentScope) {
                var input = $("input[name='" + propName + "']"),
                    container = input.parents(".form-group");
                if (input.length) {
                    if (isValid) {
                        container.addClass('has-success');
                        container.removeClass('has-error');
                    } else {
                        container.addClass('has-error');
                        container.removeClass('has-success');
                    }
                }
                if (!container.find('.glyphicon').length) {
                    container.find(".input-group")
                        .append($('<span class="glyphicon form-control-feedback" aria-hidden="true"></span>'));
                }
                if (isValid) {
                    container.find('.glyphicon').addClass('glyphicon-ok').removeClass('glyphicon-remove');
                } else {
                    container.find('.glyphicon').addClass('glyphicon-remove').removeClass('glyphicon-ok')
                }
                if (fnNames && fnNames.length) {
                    fnNames.forEach(function (fnName) {
                        var errorName = propName + fnName.replace('validate', '') + 'ErrorMsg';
                        if (!container.find("." + errorName).length) {
                            container.find(".input-group").append(angular.element('<span></span>').attr('ng-bind', 'validatorsErrors.' + errorName)
                                .addClass('errorMsg').addClass(errorName));
                        }
                    });
                    $compile(container.find("span"))(currentScope);
                }
            },
            formatValueByPattern: function (value, parts) {
                var cursor = 0;
                for (var index = 0; index < parts.length; index++) {
                    cursor += parts[index].length;
                    if (value.length > cursor) {
                        value = value.slice(0, cursor) + " " +
                            value.slice(cursor);
                        cursor++;
                    } else {
                        break;
                    }
                }
                return value;
            },
            datePickerAction: function (propName, isValid, fnNames, currentScope) {
                var input = $("input[name='" + propName + "']"),
                    parentDiv = input.parent();
                if (input.length) {
                    if (!isValid) {
                        input.addClass('is-invalid');
                        if (input.next("span")) {
                            input.next("span").addClass("is-invalid");
                        }
                        if (!parentDiv.siblings() || !parentDiv.siblings().hasClass('error-Message-Wrap')) {
                            parentDiv.after(angular.element($compile('<div class="error-Message-Wrap">' +
                                '<span class="sg-Validation-errorMessage" ng-bind="errors.dateNotEmptyErrorMsg"></span>' +
                                '<span class="sg-Validation-errorMessage" ng-bind="errors.dateLessErrorMsg"></span>' +
                                '<span class="sg-Validation-errorMessage" ng-bind="errors.dateMoreErrorMsg"></span></div>')(currentScope)));
                        }
                    } else {
                        input.removeClass("is-invalid");
                        if (input.next("span")) {
                            input.next("span").removeClass("is-invalid");
                        }
                    }
                }
            }
        };
    }])
    .directive('restrictFloat', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'AC',
            scope: {
                'floatPrecision': '@',
                'max': '@'
            },
            link: function (scope, $element) {
                $element.on('keypress', function (event) {
                    var pressChar = String.fromCharCode(event.which || event.charCode || event.keyCode);
                    if (!validator.regexValidateFns.onlyFloat(pressChar)) {
                        event.preventDefault();
                        return false;
                    }
                    //only allow one .
                    if (pressChar === "." && (!this.value || this.value.indexOf(".") !== -1)) {
                        event.preventDefault();
                        return false;
                    }
                    function needRestrict(target, value) {
                        return value.substring(0, target.selectionEnd).indexOf(".") !== -1;
                    }

                    if (this.value && needRestrict(event.target, this.value)) {
                        if (!validator.regexValidateFns.onlyFloat(this.value, scope.floatPrecision)) {
                            event.preventDefault();
                            return false;
                        }
                    }
                });
                //handle ctrl+V
                $element.on('paste', function (event) {
                    var pastedData = event.originalEvent.clipboardData.getData('text');
                    if (!validator.regexValidateFns.onlyFloat(pastedData, scope.floatPrecision)) {
                        event.preventDefault();
                        return false;
                    }
                });
            }
        };
    }])
    .directive('restrictName', ['validator', 'action', function (validator, action) {
        return {
            require: 'ngModel',
            restrict: 'AC',
            link: function (scope, $element, attrs, modelCtrl) {
                scope.maxLength = attrs.maxLength;

                $element.on('keydown', function (event) {
                    var inputCode = event.which || event.charCode || event.keyCode;
                    if ((this.value.length > scope.maxLength - 1) && !(event.ctrlKey || inputCode == 8)) {
                        event.preventDefault();
                        return false;
                    }
                });
            }
        };
    }])
    .directive('restrictInt', ['validator', 'action', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'AC',
            scope: {
                'maxLength': '@'
            },
            link: function (scope, $element, attrs, modelCtrl) {
                var validValue = $element.val();
                modelCtrl.$parsers.push(function (value) {
                    if (!validator.regexValidateFns.onlyNumber(value) || !validator.normalValidateFns.validateNoMoreThan(value.length, parseInt(scope.maxLength))) {
                        var expectedValue = value.substring(0, parseInt(scope.maxLength));
                        modelCtrl.$setViewValue(expectedValue.trim());
                        modelCtrl.$render();
                        return expectedValue;
                    }
                    return value;
                });

                $element.on('keypress', function (event) {
                    var allowedCode = [8, 37, 38, 39, 40];
                    if (_.contains(allowedCode, event.keyCode)) {
                        return;
                    }
                    var pressChar = String.fromCharCode(event.which || event.charCode || event.keyCode);
                    if (!validator.regexValidateFns.onlyNumber(pressChar) || pressChar == " ") {
                        event.preventDefault();
                        return false;
                    }
                });

                //handle ctrl+V
                $element.on('paste', function (event) {
                    var pastedData = event.originalEvent.clipboardData.getData('text');
                    if (!validator.regexValidateFns.onlyNumber(pastedData, scope.floatPrecision) || !validator.normalValidateFns.validateNoMoreThan(this.value.length, parseFloat(pastedData))) {
                        event.preventDefault();
                        return false;
                    }
                });
            }
        };
    }])
    .directive('restrictDate', ['validator', 'action', function (validator, action) {
        return {
            require: 'ngModel',
            restrict: 'AC',
            scope: {
                'maxLength': '@'
            },
            link: function (scope, $element, attrs, modelCtrl) {
                $element.on('keydown', function (event) {
                    var pressCode = event.which || event.charCode || event.keyCode;
                    if (pressCode === 8) {
                        if (this.selectionEnd !== this.value.length) {
                            event.preventDefault();
                            return false;
                        }
                    }
                    if (pressCode < 48 || (pressCode > 90 && pressCode < 123)) {
                        return;
                    }
                    if (!validator.regexValidateFns.restrictDate(String.fromCharCode(pressCode))) {
                        event.preventDefault();
                        return false;
                    }
                    if (this.value && !validator.regexValidateFns.onlyDate(this.value)) {
                        event.preventDefault();
                        return false;
                    }
                });

                $element.on('keyup', function (event) {
                    var pressCode = event.which || event.charCode || event.keyCode;
                    if (pressCode < 48 || (pressCode > 90 && pressCode < 123)) {
                        return;
                    }
                    if (this.value.length === 2 || this.value.length === 5) {
                        this.value += "/";
                    }
                });

                //handle ctrl+V
                $element.on('paste', function (event) {
                    var pastedData = event.originalEvent.clipboardData.getData('text');
                    if (!validator.regexValidateFns.onlyDate(pastedData)) {
                        event.preventDefault();
                        return false;
                    }
                });
            }
        };
    }])
    .directive('restrictLength', ['validator', 'action', function (validator, action) {
        return {
            require: 'ngModel',
            restrict: 'AC',
            scope: {
                'maxlength': '@'
            },
            link: function (scope, $element, attrs, modelCtrl) {
                $element.on('keydown', function (event) {
                    if (!validator.normalValidateFns.validateLength(this.value, scope.maxlength)) {
                        event.preventDefault();
                        return false;
                    }
                });
            }
        };
    }])
    .directive('restrictPhonePattern', ['validator', 'action', function (validator, action) {
        return {
            require: 'ngModel',
            restrict: 'AC',
            scope: {
                'maxLength': '@',
                'placeholder': '@',
                'format': '@'
            },
            link: function (scope, $element, attrs, modelCtrl) {
                //bind events
                $element.bind('blur', function () {
                    validator.clearError(attrs.name);
                    validator.validate(attrs.name);
                    scope.$apply();
                });

                $element.on('keypress', function (event) {
                    var pressChar = String.fromCharCode(event.which || event.charCode || event.keyCode);
                    if (!validator.regexValidateFns.onlyNumber(pressChar)) {
                        event.preventDefault();
                        return false;
                    }
                });

                //formatters and parsers
                if (!scope.format && !scope.placeholder) {
                    return;
                }
                var parts = (scope.format || scope.placeholder).split(" ");
                modelCtrl.$parsers.push(function (value) {
                    var viewValue = value.replace(/ /g, '');
                    value = action.formatValueByPattern(viewValue, parts);
                    modelCtrl.$setViewValue(value);
                    modelCtrl.$render();
                    return viewValue;
                });

                modelCtrl.$formatters.push(function (value) {
                    return value && action.formatValueByPattern(value, parts);
                });
            }
        };
    }])
    .directive('restrictPercentages', function () {
        return {
            link: function (scope, $element, attrs) {
                function modifyCurrentString(currentString, insertString, caretStart, caretEnd) {
                    var newString = currentString;
                    if (caretStart !== caretEnd) {
                        newString = newString.substring(0, caretStart) + insertString + newString.substring(caretEnd, newString.length);
                    }
                    else if (caretStart === 0) {
                        newString = insertString + newString;
                    }
                    else if (caretStart === newString.length) {
                        newString = newString + insertString;
                    }
                    else {
                        newString = newString.substring(0, caretStart) + insertString + newString.substring(caretStart, newString.length);
                    }

                    return newString;
                }

                function isValidInput(newString) {
                    var matches = newString.match(/[^0-9\\.]/);
                    if (matches !== null) {
                        return false;
                    }
                    var decimalTokens = newString.split('.');
                    // there should only be 1 decimal point
                    if (decimalTokens.length > 2) {
                        return false;
                    }
                    // max 2 decimal places
                    if (decimalTokens.length > 1 && decimalTokens[1].length > 2) {
                        return false;
                    }

                    // make sure new value is between 0 & 100
                    var floatValue = parseFloat(newString).toFixed(2);
                    if (floatValue > 100) {
                        return false;
                    }
                    return true;
                }

                function shouldProcessKeystroke(e, currentValue) {
                    var newString;
                    var caretStart = $element[0].selectionStart;
                    var caretEnd = $element[0].selectionEnd;
                    //              tab            arrow right         arrow left              end                 home                  F5
                    if (e.charCode === 0 && (e.keyCode === 9 || e.keyCode === 39 || e.keyCode === 37 || e.keyCode === 35 || e.keyCode === 36 || e.keyCode === 116)) {
                        return true;
                    }
                    // copy & paste
                    if (e.ctrlKey && (e.charCode === 99 || e.charCode === 118)) {
                        return true;
                    }
                    // backspace
                    if (e.charCode === 0 && e.keyCode === 8) {
                        if (caretStart !== caretEnd) {
                            newString = modifyCurrentString(currentValue, '', caretStart, caretEnd);
                        }
                        else {
                            newString = currentValue.substring(0, caretStart - 1) + currentValue.substring(caretStart, currentValue.length);
                        }
                        return isValidInput(newString, caretStart, caretEnd);
                    }
                    // delete
                    if (e.charCode === 0 && e.keyCode === 46) {
                        if (caretStart !== caretEnd) {
                            newString = modifyCurrentString(currentValue, '', caretStart, caretEnd);
                        }
                        else {
                            newString = currentValue.substring(0, caretStart) + currentValue.substring(caretStart + 1, currentValue.length);
                        }
                        return isValidInput(newString, caretStart, caretEnd);
                    }
                    var char = String.fromCharCode(e.which || e.charCode || e.keyCode);
                    if (char == '.' || (char >= '0' && char <= '9')) {
                        newString = modifyCurrentString(currentValue, char, caretStart, caretEnd);
                        return isValidInput(newString, caretStart, caretEnd);
                    }
                    else {
                        return false;
                    }
                }

                $element.on('keypress', function (e) {
                    return shouldProcessKeystroke(e, $element[0].value);
                });
                $element.on('keydown', function (e) {
                    // keypress event does not capture delete or backspace presses
                    if (e.charCode === 0 && (e.keyCode === 46 || e.keyCode === 8)) {
                        return shouldProcessKeystroke(e, $element[0].value);
                    }
                    return true;
                });
                $element.on('paste', function (event) {
                    var pastedData = event.originalEvent.clipboardData.getData('text');

                    if (isValidInput(modifyCurrentString($element[0].value, pastedData, $element[0].selectionStart, $element[0].selectionEnd))) {
                        return true;
                    }
                    else {
                        event.preventDefault();
                        return false;
                    }
                });
                $element.on('blur', function (e) {
                    var currentValue = $element.val();
                    if (currentValue.charAt(0) === '.') {
                        var newValue = '0' + currentValue;
                        $element.val(newValue);
                    }
                    return true;
                });
            }
        };
    })
    .directive('restrictRegexPattern', [function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs) {
                var pattern = attrs.restrictRegexPattern;
                element.on('keypress', function (event) {
                    var pressChar = String.fromCharCode(event.which || event.charCode || event.keyCode);
                    if (!_.isRegExp(pattern)) {
                        pattern = new RegExp(pattern);
                    }
                    if (!pattern.test(pressChar)) {
                        event.preventDefault();
                        return false;
                    }
                });
            }
        };
    }]);

