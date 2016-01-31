(function () {
  'use strict';

  angular
    .module('starter')
    .factory('ProjectService', ProjectService);

  ProjectService.$inject = ['$http', 'localstorage', 'EndpointConfigService', 'uuid2'];
  function ProjectService($http, localstorage, EndpointConfigService, uuid2) {

    var service = {
      getProjects: getProjects,
      getProject: getProject,
      addProject: addProject,
      deleteProject: deleteProject,
      addTask: addTask,
      deleteTask: deleteTask,
      completeTask: completeTask
    },
      MODEL = '/projects'
      ;

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
      var projects = localstorage.get(MODEL);
      if (projects) {
        data = angular.fromJson(projects);
      }

      return data;
    }

    function addProject(name) {
      var project = {
        "title": name,
        "id": uuid2.newguid(),
        "tasks": []
      };

      data.push(project);
      saveProjects();

      return project;
    }

    function deleteProject(project) {
      var projectLocation = data.indexOf(project);
      if (projectLocation > -1) {
        data.splice(projectLocation, 1);
        saveProjects();
      }
    }

    function addTask(project, taskName) {
      var task = {
        "title": taskName,
        "completed": false,
        "id": uuid2.newguid(),
      };

      project.tasks.push(task);
      saveProjects();
    }

    function deleteTask(project, task) {
      var taskToDelete = project.tasks.indexOf(task);
      if (taskToDelete > -1) {
        project.tasks.splice(taskToDelete, 1);
        saveProjects();
      }
    }

    function completeTask(project, task) {
      var taskToComplete = project.tasks.indexOf(task);
      console.log(taskToComplete, project.tasks[taskToComplete]);
      
      if (taskToComplete > -1) {
        task.completed = !task.completed;
        project.tasks[taskToComplete] = task;
        saveProjects();
        return task;
      }
    }

    function saveProjects() {
      localstorage.set(MODEL, angular.toJson(data));
    }
  }
})();