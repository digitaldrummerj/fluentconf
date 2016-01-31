(function () {
  'use strict';

  angular
    .module('starter.common', [])
    .constant('CURRENT_BACKEND', 'localstorage')
    .service('EndpointConfigService', EndpointConfigService);

  EndpointConfigService.$inject = ['$rootScope', 'CURRENT_BACKEND'];
  function EndpointConfigService($rootScope, CURRENT_BACKEND) {
    var service = this,
      endpointMap = {
        localstorage: { URI: '', root: '', format: '' },
        backend: { URI: '', root: '', format: '' }
      },
      currentEndpoint = endpointMap[CURRENT_BACKEND],
      userId = '',
      backend = CURRENT_BACKEND;

    service.getCurrentBackend = function () {
      return backend;
    }

    service.getCurrentFormat = function () {
      return currentEndpoint.format;
    }

    service.getCurrentURI = function () {
      return currentEndpoint.URI;
    }

    service.getUrl = function (model) {
      return currentEndpoint.URI + userId + model;
    }

    $rootScope.$on('onCurrentUserId', function (event, id) {
      userId = id;
    });
  }
})();