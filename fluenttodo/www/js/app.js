// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('todo', ['ionic', 'todo.services', 'backand'])

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
  .config(function (BackandProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
    BackandProvider.setAppName('ddjtodo');
    BackandProvider.setSignUpToken('b9d096ad-a2bd-49cd-9a16-0ed28d839e24');
    BackandProvider.setAnonymousToken('9ebbac2a-6704-42e5-91be-608b78475da2');

    $stateProvider
    // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tabs',
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
        url: '/tasks/:index',
        controller: 'TasksController',
        controllerAs: 'vm',
        templateUrl: 'templates/tasks.html',
        resolve: {
          /* @ngInject */
          project: function ($stateParams, ProjectService) {
            return ProjectService.getProject($stateParams.index);
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

    $urlRouterProvider.otherwise('/login');
    $httpProvider.interceptors.push('APIInterceptor');
  });