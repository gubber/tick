module.exports = function(config){
    config.set({
    basePath : '../../',

    files : [
      'angular/angular.js',
      'angular/angular-*.js',
      'angular/angular-mocks.js',
      'client/**/*.js',
      'test/client/**/*.js'
    ],

    exclude : [
      'angular/angular-loader.js',
      'angular/*.min.js',
      'angular/angular-scenario.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})}
