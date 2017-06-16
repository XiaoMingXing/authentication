'use strict';

/**
 * @ngdoc function
 * @name portalApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the portalApp
 */
angular.module('costAnalysisApp')
  .controller('RecruiterCtrl', function ($scope, $state, $route) {

    $scope.tabs = {
      personalDetails: false,
      occupations: false,
      applyRecords: false
    };

    function initStatus() {
      var splits = $state.current.name.split(".");
      if (!angular.isUndefined($scope.tabs[splits[splits.length - 1]])) {
        $state.go($state.current.name);
        $scope.switchTab[splits[splits.length - 1]];
      } else {
        $state.go('recruiter.personalDetails');
        $scope.tabs.personalDetails = true;
      }
    }

    $scope.init = function () {
      initStatus();
    };

    $scope.switchTab = function (tabName) {
      for (var key in $scope.tabs) {
        if (key === tabName) {
          $scope.tabs[tabName] = true;
        } else {
          $scope.tabs[key] = false;
        }
      }
    }

  })
  .controller('PersonalDetailsCtrl', function ($scope) {
    $scope.config = {
      editState: true
    };
    $scope.personalDetails = {
      email: "920477852@qq.com",
      username: "xiaomixin",
      phoneNumber: "132234234435",
      resumes: [{
        id: "999234234ffde892cc23234ae",
        fileName: "englishResume.pdf",
        bucket: "recruit-resumes-bucket"
      }]
    };

    $scope.cancel = function () {
      $scope.config.editState = false;
    };

    $scope.edit = function () {
      $scope.config.editState = true;
    };

    $scope.save = function () {

    }

  })
  .controller('OccupationsCtrl', function ($scope) {
    $scope.jobs = [{
      jobId: '2342342ffdd',
      jobTitle: '大数据工程师',
      jobCompany: 'Thoughtworks',
      jobRate: 4.5,
      salary: '20k-30k',
      companyId: 'edfd234234',
      companyDescription: '',
      jobDescriptions: ['负责公司B2B2C云生态平台的核心系统/产品的技术方案设计、评审及主持研发实现',
        '负责架构及性能优化'],
      jobRequirements: ['精通JAVA语言，至少三年以上Java开发经验， 主导过大型复杂业务的系统或产品的技术设计及研发，有电商平台经验者优先',
        '能熟练使用UML建模工具进行分析和设计', '具有设计和开发对外API接口经验和能力，同时具备跨平台的API规范设计以及API高效调用设计能力者优先考虑']
    }, {
      jobId: '2342342ffdd',
      jobTitle: '大数据工程师',
      jobCompany: 'Thoughtworks',
      jobRate: 4.5,
      salary: '20k-30k',
      companyId: 'edfd234234',
      companyDescription: '',
      jobDescriptions: ['负责公司B2B2C云生态平台的核心系统/产品的技术方案设计、评审及主持研发实现',
        '负责架构及性能优化'],
      jobRequirements: ['精通JAVA语言，至少三年以上Java开发经验， 主导过大型复杂业务的系统或产品的技术设计及研发，有电商平台经验者优先',
        '能熟练使用UML建模工具进行分析和设计', '具有设计和开发对外API接口经验和能力，同时具备跨平台的API规范设计以及API高效调用设计能力者优先考虑']
    }];

    $scope.criterias = [{
      techArea: 'cloud',
      text: '云计算',
      jobs: 35
    }, {
      techArea: 'bigData',
      text: '大数据',
      jobs: 20
    }];

    $scope.addCriteria = function () {
    };

    $scope.search = function (value) {

    };

    $scope.checkJobDetail = function (jobId) {

    };

    $scope.checkJobCompany = function (companyId) {

    }

  })
  .controller('ApplyRecordsCtrl', function ($scope) {

    $scope.status = {
      all: {
        pass: false,
        text: '全部'
      },
      submit: {
        pass: true,
        text: '已提交'
      },
      filterResume: {
        pass: true,
        text: '筛选简历'
      },
      phoneRecruit: {
        pass: true,
        text: '电话面试'
      },
      homework: {
        pass: false,
        text: 'Homework'
      },
      faceToFace: {
        pass: false,
        text: '现场面试'
      }
    };

    $scope.records = [{
      status: 'filterResume',
      applyDate: '2016-12-20',
      jobId: '2342342ffdd',
      jobTitle: '大数据工程师',
      jobCompany: 'Thoughtworks',
      jobRate: 4.5,
      salary: '20k-30k',
      companyId: 'edfd234234',
      companyDescription: '',
      jobDescriptions: ['负责公司B2B2C云生态平台的核心系统/产品的技术方案设计、评审及主持研发实现',
        '负责架构及性能优化'],
      jobRequirements: ['精通JAVA语言，至少三年以上Java开发经验， 主导过大型复杂业务的系统或产品的技术设计及研发，有电商平台经验者优先',
        '能熟练使用UML建模工具进行分析和设计', '具有设计和开发对外API接口经验和能力，同时具备跨平台的API规范设计以及API高效调用设计能力者优先考虑']
    }, {
      status: 'pass',
      applyDate: '2016-12-21',
      jobId: '2342342ffdd',
      jobTitle: '大数据工程师',
      jobCompany: 'Thoughtworks',
      jobRate: 4.5,
      salary: '20k-30k',
      companyId: 'edfd234234',
      companyDescription: '',
      jobDescriptions: ['负责公司B2B2C云生态平台的核心系统/产品的技术方案设计、评审及主持研发实现',
        '负责架构及性能优化'],
      jobRequirements: ['精通JAVA语言，至少三年以上Java开发经验， 主导过大型复杂业务的系统或产品的技术设计及研发，有电商平台经验者优先',
        '能熟练使用UML建模工具进行分析和设计', '具有设计和开发对外API接口经验和能力，同时具备跨平台的API规范设计以及API高效调用设计能力者优先考虑']
    }];

    $scope.init = function () {
      var pass = {
        pass: true,
        text: '通过'
      };

      for (var key in $scope.status) {
        if (key === 'all') {
          continue;
        }
        if (!$scope.status[key].pass) {
          pass.pass = false;
        }
        $scope.status['pass'] = pass;
      }
    };

    $scope.filterApplyRecords = function (value) {
      console.log(value);
    };


    $scope.getRecordStatus = function (status) {
      if (status === 'pass' || status === 'failed') {
        return status + '-status';
      }
      return 'pending-status';
    }


  });
