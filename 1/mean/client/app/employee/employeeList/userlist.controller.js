'use strict';

angular.module('mflowApp')
  .controller('UserlistCtrl', function ($scope, Me, User, $state, $timeout) {
        $scope.me = Me;

    $scope.users = [];
    $scope.totalUsers = 0;
    $scope.sort = 'name';
    $scope.order = 'asc';
    $scope.size = 3;
    getResultsPage(1);

    $scope.pagination = {
      current: 1
    };

    $scope.pageChanged = function(newPage) {
      getResultsPage(newPage);
    };

    function getResultsPage(pageNumber) {
      User.search({page:pageNumber-1, sort:$scope.sort, order:$scope.order, size:$scope.size}).$promise
        .then(function(result) {
          $scope.users = result.users;
          $scope.totalUsers = result.total;
        });
    }

    $scope.sortBy = function(sort){
      if ($scope.sort !== sort) {
        $scope.sort = sort;
        $scope.order = "asc";
      } else {
        $scope.order = ($scope.order === "asc" ? "desc" : "asc");
      }

      getResultsPage(1);
    };

        $scope.delete = function(userId){
            User.delete({id:userId}).$promise.then(function(){
              return $timeout(function () {
//                $state.reload();
                $state.go('.', {}, { reload: true });
              }, 1);
            });
        };

        $scope.addNew = function(){
            $state.go('user.new');
        };
  });
