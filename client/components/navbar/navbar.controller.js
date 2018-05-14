'use strict';

angular.module('mncalApp')
  .controller('NavbarCtrl', function ($scope, Auth) {
    $scope.menu = [{
      'title': 'Laboratorio Movil',
      'state': 'main'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
  });
