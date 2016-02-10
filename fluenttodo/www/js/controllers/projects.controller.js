(function () {
  'use strict';

  angular
    .module('todo')
    .controller('ProjectsController', ProjectsController);

  ProjectsController.$inject = ['ProjectService', '$ionicModal', '$state', '$scope'];
  function ProjectsController(ProjectService, $ionicModal, $state, $scope) {
    var vm = this;
    vm.saveNewProject = saveNewProject;
    vm.deleteProject = deleteProject;
    vm.showProjectModal = showProjectModal;
    vm.closeProjectModal = closeProjectModal;
    activate();

    ////////////////

    function activate() {
      vm.projects = ProjectService.getProjects();

      $ionicModal.fromTemplateUrl(
        'templates/modal-new-project.html',
        function (modal) {
          vm.projectModal = modal;
        },
        {
          scope: $scope
        }
        );
    }

    function saveNewProject(project) {
      console.log(project);
      var projectTitle = project.title;
      if (projectTitle) {
        var newProject = ProjectService.addProject(project.title);
        console.log('projects', vm.projects);
        
        vm.closeProjectModal();
        
        $state.go('/tasks', { index: newProject.id});

      }

      project.title = '';
    }

    function showProjectModal() {
      vm.projectModal.show();
    }

    function closeProjectModal() {
      vm.projectModal.hide();
    }
    
    function deleteProject(project) {
      ProjectService.deleteProject(project);
    }
  }
})();