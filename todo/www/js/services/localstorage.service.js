(function() {
'use strict';

  angular
    .module('starter.utils', [])
    .factory('localstorage', localstorage);

  localstorage.$inject = ['$window'];
  function localstorage($window) {
    var service = {
      get: get,
      set: set,
      setObject: setObject,
      getObject: getObject
    };
    
    return service;

    ////////////////
    function get(key, defaultValue) { 
      return $window.localStorage[key] || defaultValue;
    }
    
    function set(key, value) {
      $window.localStorage[key] = value;
    }
    
    function setObject(key, value) {
      $window.localStorage[key] = angular.toJson(value);
    }
    
    function getObject(key) {
      return angular.fromJson($window.localStorage[key] || '{}');
    }
  }
})();