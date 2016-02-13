// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('todo', [
  'ionic',
  'todo.services',
  'backand',
  'todo.backand',
  'todo.config.constants'
])
  .run(function ($ionicPlatform, $rootScope, $state, Backand) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

      var isMobile = !(ionic.Platform.platforms[0] == "browser");
      Backand.setIsMobile(isMobile);
      Backand.setRunSignupAfterErrorInSigninSocial(true);

    });

    $rootScope.$on('BackandSignOut', function () {
      console.log("user is signed out, sending to login");
      $state.go('login');
    });
  })
  .config(function (BackandProvider, $stateProvider, $urlRouterProvider, $httpProvider, CONSTS) {
    BackandProvider.setAnonymousToken(CONSTS.anonymousToken);
    BackandProvider.setSignUpToken(CONSTS.signUpToken);
    BackandProvider.setAppName(CONSTS.appName);

    $urlRouterProvider.otherwise('/login');
    $httpProvider.interceptors.push('APIInterceptor');

    $stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      .state('tab.projects', {
        url: '/projects',
        views: {
          'tab-projects': {
            templateUrl: 'templates/tab-projects.html',
            controller: 'ProjectsController as vm'
          }
        }
      })
      .state('tab.tasks', {
        url: '/tasks/:projectId',
        params: {
          projectName: ""
        },
        views: {
          'tab-projects': {
            templateUrl: 'templates/tab-project-tasks.html',
            controller: 'TasksController as vm',
            resolve: {
              /* @ngInject */
              tasks: function ($stateParams, TasksService) {
                console.log('resolving tasks');
                return TasksService.getTasks({ id: $stateParams.projectId });
              }
            }
          }
        }
      })
      .state('tab.profile', {
        url: '/profile',
        views: {
          'tab-profile': {
            templateUrl: 'templates/tab-profile.html',
            controller: 'ProfileController as vm'
          }
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginController as login'

      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'SignUpController as signup'
      })
    ;

  });