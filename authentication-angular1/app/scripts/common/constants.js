var ENV = 'http://localhost:9001/cost/';
angular.module('costAnalysisApp')
  .constant('Constants', {
    SERVICE_URLS: {
      SERVICE_COST: ENV + 'rest/analysis/services',
      SERVICE_COST_STATISTIC: ENV + 'rest/analysis/services/statistic',

      LOGIN_URL: ENV + 'rest/auth/login',
      REGISTER_URL: ENV + 'rest/auth/register',

      LIST_USER_URL: ENV + 'rest/manage/user'
    }
  });
