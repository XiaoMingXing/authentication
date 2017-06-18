'use strict';

var example = example || {};

(function () {

  var localBaseUrl;

  this.createClient = function (baseUrl) {
    localBaseUrl = baseUrl;
    return this;
  };

  this.login = function (body) {
    //Makes a synchronous request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', localBaseUrl + '/cost/rest/auth/loginPact', false);
    xhr.send(body);
    console.log(xhr.response);
    return JSON.parse(xhr.response);
  };
}).apply(example);
