(function () {
  'use strict';

  angular
    .module('todo.services')
    .factory('ProjectService', ProjectService);

  ProjectService.$inject = ['$http', 'BackandDataService', 'UserModel'];
  function ProjectService($http, BackandDataService, UserModel) {
    var service = {
      getProjects: getProjects,
      addProject: addProject,
      deleteProject: deleteProject,
    },
      objectName = 'project';
    return service;

    ////////////////

    function getProjects(pageNumber, pageSize) {
      var sort = null, filter = null;
      return BackandDataService.getList(objectName, sort, filter, pageNumber || 1, pageSize || 10);
    }

    function addProject(name) {
      var project = {
        "name": name,
        "created_on": new Date()
      };

      return BackandDataService.saveItem(objectName, project, { returnObject: true});
    }

    function deleteProject(project) {
      console.log('PojectsService deleteProject', project);
      return BackandDataService.deleteItem(objectName, project.id).then(function (result) {
        console.log('deleteProject result', result);
        return result;
      }, function (error) {
        console.log('deleteProject error', error);
        throw error;
      });
    }

  }
})();