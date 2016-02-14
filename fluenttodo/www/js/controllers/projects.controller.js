(function () {
  'use strict';

  angular
    .module('todo')
    .controller('ProjectsController', ProjectsController);

  ProjectsController.$inject = ['ProjectService', '$ionicModal', '$state', '$scope', 'LoginService', '$ionicListDelegate'];
  function ProjectsController(ProjectService, $ionicModal, $state, $scope, LoginService, $ionicListDelegate) {

    var vm = this;
    vm.saveNewProject = saveNewProject;
    vm.deleteProject = deleteProject;
    vm.showProjectModal = showProjectModal;
    vm.closeProjectModal = closeProjectModal;
    activate();

    ////////////////

    function activate() {


      ProjectService.getProjects().then(function (result) {
        vm.projects = result.data.data;
      }
        , function errorCallback(response) {
          console.log(response);
        });

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
      var projectName = project.name;
      if (projectName) {
        ProjectService.addProject(project.name).then(function (result) {
          console.log('project', result);

          vm.projects.push(result.data);

          vm.closeProjectModal();
          project.name = '';

          $state.go('tab.tasks', { projectId: result.data.id }, { location: true });
        }
          , function errorCallback(response) {
            console.log(response);
          }
          );
      }
    }

    function showProjectModal() {
      vm.projectModal.show();
    }

    function closeProjectModal() {
      vm.projectModal.hide();
    }

    function deleteProject(project) {
      console.log('deleteProject', project, vm.projects);
      ProjectService.deleteProject(project).then(function (result) {
        console.log('deleting row from vm.task', vm.projects.indexOf(project));
        vm.projects.splice(vm.projects.indexOf(project), 1);
      },
        function (error) {
          console.log('error deleting project', error);
          $ionicListDelegate.closeOptionButtons();
        });
    }
  }
})();