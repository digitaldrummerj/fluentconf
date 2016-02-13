(function () {
  'use strict';

  angular
    .module('todo.services')
    .factory('ProjectService', ProjectService);

  ProjectService.$inject = ['$http', 'BackandDataService', 'UserModel'];
  function ProjectService($http, BackandDataService, UserModel) {
    var service = {
      getProjects: getProjects,
      getProject: getProject,
      addProject: addProject,
      deleteProject: deleteProject,
    },
      objectName = 'project';

    var data = [];
    getProjects();
    return service;

    ////////////////
    function getProject(id) {

      for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          return data[i];
        }
      }
    }

    function getProjects() {
      return BackandDataService.getList(objectName);
    }

    function addProject(name) {
      var project = {
        "name": name,
        "created_on": new Date()
      };

      return BackandDataService.saveItem(objectName + '?returnObject=true', project);
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