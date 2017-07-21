angular
    .module('homebookMdl', [])
    .controller('homebookCtrl', ['$scope', '$http', function ($scope, $http) {

        // here will be our properties
        $scope.list = [];
        $scope.selectedItem = {};
        $scope.updateItem = {};
        $scope.pageSize = 5;
        $scope.operation = "";
        $scope.regions = [];
        $scope.selectedRegion = {};
        $scope.isCreate = false;

        // here will be our function
        $scope.init = function () {
            this.loadRegions();
            this.loadPersons(0, 5);
        }

        $scope.next = function () {
            var range = $scope.getRange();
            $scope.loadPersons(range.finishId)
        }

        $scope.previous = function () {
            var range = $scope.getRange();
            $scope.loadPersons(range.startId - $scope.pageSize);
        }

        $scope.select = function (item) {
            $scope.operation = "";
            $scope.selectedItem = item;
            $scope.isCreate = false;
            $scope.updateItem = {
                Id: item.Id,
                Firstname: item.Firstname,
                Lastname: item.Lastname,
                RegionId: item.RegionId,
                Title: item.Title
            };
            $scope.selectedRegion = $scope.regions.filter(function (reg) {
                return reg.Id == item.RegionId;
            })[0];
        }

        $scope.create = function () {
            $scope.operation = "create";
            console.log($scope.operation);
            $scope.isCreate = true;
            $scope.updateItem = {
                Id: 0,
                Firstname: "",
                Lastname: "",
                RegionId: 0,
                Title: ""
            };
            $scope.selectedRegion = $scope.regions[0];
        }

        $scope.update = function () {
            $scope.operation = "update";
        }

        $scope.delete = function () {
            $scope.operation = "delete"
        }

        $scope.submit = function () {
            if ($scope.operation == 'delete') {
                $scope.deletePerson($scope.updateItem.Id);
            } else if ($scope.operation == 'update') {
                $scope.updatePerson({
                    Id: $scope.updateItem.Id,
                    Firstname: $scope.updateItem.Firstname,
                    Lastname: $scope.updateItem.Lastname,
                    RegionId: $scope.selectedRegion.Id,
                    Title: $scope.selectedRegion.Title
                });
            } else if ($scope.operation == 'create') {
                $scope.createPerson({
                    Id: 0,
                    Firstname: $scope.updateItem.Firstname,
                    Lastname: $scope.updateItem.Lastname,
                    RegionId: $scope.selectedRegion.Id,
                    Title: $scope.selectedRegion.Title
                });
            } else {

            }
        }

        $scope.cancel = function () {

        }

        $scope.loadRegions = function () {
            $http({
                method: 'get',
                url: '/api/Region'
            }).then(function (response) {
                $scope.regions = response.data;
                $scope.selectedRegion = $scope.regions[0];
                })
        }

        $scope.loadPersons = function (startId) {
            $http({
                method: 'get',
                url: '/api/People?startId=' + startId + "&pageSize=" + $scope.pageSize
            }).then(function (response) {
                $scope.list = [];
                $scope.list = response.data;
                });
        }

        $scope.createPerson = function (person) {
            var range = $scope.getRange();
            console.log(range);
            $http({
                method: 'post',
                url: '/api/People',
                data: person
            }).then(function (response) {
                $scope.loadPersons(range.startId);
            });
        }

        $scope.updatePerson = function (person) {
            var range = $scope.getRange();
            $http({
                method: 'put',
                url: '/api/People',
                data: person
            }).then(function (response) {
                $scope.loadPersons(range.startId);
                });
        }

        $scope.deletePerson = function (id) {
            var range = $scope.getRange();
            $http({
                method: 'delete',
                url: '/api/People/' +id
            }).then(function (response) {
                $scope.loadPersons(range.startId);
                });
        }

        $scope.getRange = function () {

            var ids = {
                startId: 0,
                finishId: 0
            };

            if ($scope.list.length > 0) {
                var length = $scope.list.length;
                ids.startId = $scope.list[0].Id;
                ids.finishId = $scope.list[length - 1].Id;
            }


            return ids;
        }

    }]);