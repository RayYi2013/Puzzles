'use strict';

angular.module('mflowApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('employee', {
        url: 'employee',
        abstract: true,
        parent: 'main',
        templateUrl: 'app/employee/employee.html',
        controller: 'EmployeeCtrl'
      })
      .state('employee.list', {
        url: '/list',
            resolve: {
                EmployeeList: function(EmployeeService){
                    return null;
                }
            },
        templateUrl: 'app/Employee/EmployeeList/EmployeeList.html',
        controller: 'EmployeelistCtrl'
      })
      .state('employee.detail', {
        url: '/detail/:id',
        templateUrl: 'app/employee/employeeDetail/employeeDetail.html',
        controller: 'EmployeedetailCtrl'
      })
        .state('employee.new', {
            url: '/new',
            templateUrl: 'app/employee/newEmployee/newEmployee.html',
            controller: 'NewEmployeeCtrl'
        });
  });