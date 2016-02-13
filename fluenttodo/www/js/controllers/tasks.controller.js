(function () {
  'use strict';

  angular
    .module('todo')
    .controller('TasksController', TasksController);

  TasksController.$inject = ['TasksService', '$stateParams', '$ionicModal', '$scope', 'tasks'];
  function TasksController(TasksService, $stateParams, $ionicModal, $scope, tasks) {

    var vm = this;
    vm.tasks = tasks;
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
    activate();

    ////////////////

    function activate() {
      // TasksService.getTasks(vm.project).then(function (result) {
      //   vm.tasks = result.data.data;
      // });

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


    function saveNewTask(task) {
      TasksService.addTask(vm.project, task.name).then(function (result) {
        //vm.project.tasks.push(newTask);
        vm.closeTaskModal();
        vm.tasks.data.push(result);
        task.title = '';
      });;

    }

    function showTaskModal() {
      vm.taskModal.show();
    }

    function closeTaskModal() {
      vm.taskModal.hide();
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
  }
})();