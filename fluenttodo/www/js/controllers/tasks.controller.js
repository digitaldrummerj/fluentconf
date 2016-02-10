(function () {
  'use strict';

  angular
    .module('todo')
    .controller('TasksController', TasksController);

  TasksController.$inject = ['ProjectService', 'project', '$ionicModal', '$scope'];
  function TasksController(ProjectService, project, $ionicModal, $scope) {
    var vm = this;
    vm.project = project;
    console.log(project);
    vm.saveNewTask = saveNewTask;
    vm.showTaskModal = showTaskModal;
    vm.closeTaskModal = closeTaskModal;
    vm.completeTask = completeTask;
    vm.deleteTask = deleteTask;

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

    function saveNewTask(task) {
      ProjectService.addTask(vm.project, task.title);
      //vm.project.tasks.push(newTask);
      vm.closeTaskModal();
      
      task.title = '';
    }

    function showTaskModal() {
      vm.taskModal.show();
    }

    function closeTaskModal() {
      vm.taskModal.hide();
    }

    function completeTask(task) {
      var updatedTask = ProjectService.completeTask(vm.project, task);
      // task = updatedTask;
    }
    
    function deleteTask(task) {
      ProjectService.deleteTask(vm.project, task);
    }
  }
})();