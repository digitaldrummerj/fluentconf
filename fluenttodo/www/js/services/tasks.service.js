(function () {
  'use strict';

  angular
    .module('todo.services')
    .factory('TasksService', TasksService);

  TasksService.$inject = ['$http', 'BackandDataService', 'UserModel'];
  function TasksService($http, BackandDataService, UserModel) {
    var service = {
      getTasks: getTasks,
      addTask: addTask,
      deleteTask: deleteTask,
      completeTask: completeTask
    },
      objectName = 'task';

    return service;

    ////////////////
   
    function getTasks(project, pageNumber, pageSize) {
      console.log('TaskService getTasks.project', project);
      var filter = '[{ "fieldName": "project_id", "operator": "in", "value":' + project.id + '}]';
      return BackandDataService.getList(objectName, null, filter, pageNumber || 1, pageSize || 10).then(function (response) {
        console.log('TaskService.getTasks result', response);
        return response.data;
      }, function (error) {
        console.log('getTasks Error', error);
      });
    }

    function addTask(project, taskName) {
      var task = {
        "name": taskName,
        "completed": false,
        "created_on": new Date(),
        "project_id": project.id
      };
      console.log('addTasks', task);
      return BackandDataService.saveItem(objectName, task, { returnObject: true }).then(function (result) {
        return result.data;
      },
        function (error) {
          console.log('addTask Error', error);
        }

        );
    }

    function deleteTask(project, task) {
      console.log('TaskService deleteTask', project, task);
      return BackandDataService.deleteItem(objectName, task.id).then(function (result) {
        console.log('deleteTask result', result);
        return result;
      }, function (error) {
        console.log('deleteTask error', error);
      });
    }

    function completeTask(project, task) {
      console.log('TaskService completeTask', project, task);
      task.completed = !task.completed;
      return BackandDataService.updateItem(objectName, task.id, task).then(function (result) {
        console.log('completeTask result', result);
        return result;
      }, function (error) {
        console.log('completeTask error', error);
      });
    }
  }
})();