(function () {
  'use strict';

  angular
    .module('todo.backand', [])
    .factory('BackandDataService', BackandDataService);

  BackandDataService.$inject = ['$http', 'Backand'];
  function BackandDataService($http, Backand) {
    var service = {
      getList: getList,
      saveItem: saveItem,
      updateItem: updateItem,
      deleteItem: deleteItem
    };

    return service;

    ////////////////
    function getList(objectName, sort, filter, returnObject) {
      return $http({
        method: 'GET',
        url: getBaseUrl() + objectName,
        params: {
          pageSize: 20,
          pageNumber: 1,
          filter: filter || '',
          sort: sort || ''
        }
      });
    }

    function saveItem(objectName, data, params) {
      console.log('back& managing', Backand.isManagingHttpInterceptor());
      return $http.post(getBaseUrl() + objectName, data).then(function (response) {             console.log('item created', response);
        return response;
})

      // return $http({
      //   method: 'post',
      //   url: getBaseUrl() + objectName,
      //   data: data,
      //   params: params || {
      //     returnObject: true
      //   }
      // });
    }

    function updateItem(objectName, id, data) {
      return $http({
        method: 'put',
        url: getBaseUrl() + objectName + '/' + id,
        data: data
      });
    }

    function deleteItem(objectName, id) {
      return $http({
        method: 'delete',
        url: getBaseUrl() + objectName + '/' + id
      });
    }
    
    function getBaseUrl() {
      return Backand.getApiUrl() + '/1/objects/';
    }
  }
})();