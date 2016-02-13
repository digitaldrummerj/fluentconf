(function () {
  'use strict';

  angular
    .module('todo.services')
    .factory('TasksService', TasksService);

  TasksService.$inject = ['$http', 'BackandDataService', 'UserModel'];
  function TasksService($http, BackandDataService, UserModel) {
    var service = {
      getTasks: getTasks,
      getTask: getTask,
      addTask: addTask,
      deleteTask: deleteTask,
      completeTask: completeTask
    },
      objectName = 'task';

    var data = [];
    //xgetTasks();
    return service;

    ////////////////
    function getTask(id) {

      for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          return data[i];
        }
      }
    }

    function getTasks(project) {
      console.log('TaskService getTasks.project', project);
      var filter = '[{ "fieldName": "project_id", "operator": "in", "value":' + project.id + '}]';
      return BackandDataService.getList(objectName, null, filter).then(function (response) {
        console.log('TaskService.getTasks result', response);
        return response.data;
      }, function (error) {
        console.log('getTasks Error', error);
      });;
      //       var projects = localstorage.get(MODEL);
      //       if (projects) {
      //         data = angular.fromJson(projects);
      //       }
      // 
      //       return data;
    }


    function addTask(project, taskName) {
      var task = {
        "name": taskName,
        "completed": false,
        "created_on": new Date(),
        "project_id": project.id
      };
      console.log('addTasks', task);
      return BackandDataService.saveItem(objectName + '?returnObject=true', task).then(function (result) {
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
      }, function (error) {
        console.log('deleteTask error', error);
      });
    }

    function completeTask(project, task) {
      console.log('TaskService completeTask', project, task);
      task.completed = !task.completed;
      return BackandDataService.updateItem(objectName, task.id, task).then(function (result) {
        console.log('completeTask result', result);
      }, function (error) {
        console.log('completeTask error', error);
      });
    }
  }
})();