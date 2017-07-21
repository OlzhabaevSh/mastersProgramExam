﻿angular
    .module('homebookMdl', [])
    .controller('homebookCtrl', ['$scope', '$http', function ($scope, $http) {

        // here will be our properties
        $scope.list = [];
        $scope.selectedItem = {};
        $scope.updateItem = {};
        $scope.pageSize = 5;

        // here will be our function
        $scope.init = function () {
            this.loadPersons(0, 5);
        }

        $scope.next = function () {
            var range = $scope.getRange();
            $scope.loadPersons(range.finishId)
        }

        $scope.previos = function () {
            var range = $scope.getRange();
            $scope.loadPersons(range.startId - $scope.pageSize);
        }

        $scope.loadPersons = function (startId) {
            $http({
                method: 'get',
                url: '/api/People?startId=' + startId + "&pageSize=" + $scope.pageSize
            }).then(function (response) {
                $scope.list = response.data;
                });
        }

        $scope.updatePerson = function () {
            var range = $scope.getRange();
            $http({
                method: 'put',
                url: '/api/People',
                data: $scope.updateItem
            })
        }

        $scope.deletePerson = function () {
            var range = $scope.getRange();
            $http({
                method: 'delete',
                url: '/api/People/' + $scope.selectedItem.Id
            }).then(function (response) {
                $scope.loadPersons(range.startId);
                });
        }

        $scope.getRange = function () {
            var lenght = $scope.list.lenght;
            return {
                startId: $scope.list[0].Id,
                finishId: $scope.list[lenght - 1].Id
            };
        }

    }]);