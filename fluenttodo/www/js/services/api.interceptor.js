(function () {
  'use strict';

  angular
    .module('todo.services')
    .service('APIInterceptor', ApiInterceptor);

  ApiInterceptor.$inject = ['$rootScope', '$q'];
  function ApiInterceptor($rootScope, $q) {
    var service = this;
    service.responseError = responseError;
    
    ////////////////

    function responseError(response) {
      if (response.status === 401) {
        $rootScope.$broadcast('unauthorized');
      }
      return $q.reject(response);
    }
  }
})();
