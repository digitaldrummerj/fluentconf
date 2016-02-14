(function () {
  'use strict';

  angular
    .module('todo')
    .controller('TasksController', TasksController);

  TasksController.$inject = ['TasksService', '$stateParams', '$ionicModal', '$scope', 'tasks'];
  function TasksController(TasksService, $stateParams, $ionicModal, $scope, tasks) {

    var vm = this;
    vm.tasks = tasks;
    console.log('task controller', vm.tasks);
    vm.stateParams = $stateParams;
    console.log('TasksController tasks', tasks);
    console.log('$stateparams', $stateParams);
    vm.project = {
      id: $stateParams.projectId,
      name: $stateParams.projectName
    };
    console.log('TaskController.project', vm.project);

    vm.saveNewTask = saveNewTask;
    vm.showTaskModal = showTaskModal;
    vm.closeTaskModal = closeTaskModal;
    vm.completeTask = completeTask;
    vm.deleteTask = deleteTask;
    vm.getMoreTasks = getMoreTasks;
    vm.doRefresh = doRefresh;
    vm.pageNumber = 1;
    vm.pageSize = 10;
    vm.moreDataCanBeLoaded = true;

    activate();
    
    ////////////////

    function activate() {
      $ionicModal.fromTemplateUrl(
        'templates/modal-new-task.html',
        function (modal) {
          vm.taskModal = modal;
        },
        {
          scope: $scope
        }
        );
    }


    function getMoreTasks() {
      vm.pageNumber = vm.pageNumber + 1;
      console.log('getMoreTasks', vm.pageNumber);
      TasksService.getTasks(vm.project, vm.pageNumber, vm.pageSize).then(function (result) {
        console.log('got more result', result);
        var rowNum = result.data.length;
        if (rowNum === 0 || rowNum < vm.pageSize) {
          vm.moreDataCanBeLoaded = false;
        }
        if (rowNum > 0) {
          vm.tasks.data = vm.tasks.data.concat(result.data);
        }
      }
        , function errorCallback(response) {
          console.log(response);
        }).finally(function () {
          $scope.$broadcast('scroll.infiniteScrollComplete')

        });
    }

    function doRefresh() {
      vm.refreshing = true;
      console.log('doRefresh');
      TasksService.getTasks(vm.project, 1, vm.pageNumber * vm.pageSize).then(function (result) {
        console.log('doRefresh result', result);
        vm.tasks = result;
      }
        , function errorCallback(response) {
          console.log(response);
        }).finally(function () {
          $scope.$broadcast('scroll.refreshComplete');
          vm.refreshing = false;

        });
    }

    function saveNewTask(task) {
      TasksService.addTask(vm.project, task.name).then(function (result) {
        vm.tasks.data.push(result);
        vm.closeTaskModal();
        task.name = '';
      });
    }

    function completeTask(task) {
      console.log('completeTask', task);
      TasksService.completeTask(vm.project, task);
    }

    function deleteTask(task) {
      TasksService.deleteTask(vm.project, task).then(function (result) {
        console.log('deleting row from vm.task', vm.tasks.data.indexOf(task));
        vm.tasks.data.splice(vm.tasks.data.indexOf(task), 1);
      });
    }

    function showTaskModal() {
      vm.taskModal.show();
    }

    function closeTaskModal() {
      vm.taskModal.hide();
    }

    $scope.$on('$destroy', function () {
      vm.taskModal.remove();
    });
  }
})();