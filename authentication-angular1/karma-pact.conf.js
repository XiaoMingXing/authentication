// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'bower_components/pact-consumer-js-dsl/dist/pact-consumer-js-dsl.js',
      'client.js',
      'pact-test/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 9090,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS_without_security'],
    customLaunchers: {
      PhantomJS_without_security: {
        base: 'PhantomJS',
        flags: ['--web-security=false']
      }
    },


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
