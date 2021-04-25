'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', ['$scope', '$http', function ($scope, $httpClient) {

        $scope.userArray = {};

        $httpClient.get("http://localhost:9000/api/rest/User.svc/users").then(function (response) {
            console.log(response.data);
            $scope.userArray = response.data;
        }).catch(function (error) {
            console.log(error);
        });


        $scope.deleteUser = function (id, username) {
            if (confirm("Are you sure to delete: " + username + " ?")) {
                console.log("Implement delete functionality here");
            }
            $httpClient.put("http://localhost:9000/api/rest/User.svc/user(" + id + ")").then(function (response) {
                $scope.userArray= $scope.userArray.filter(user => user.id !== id);
            }).catch(function (error) {
                console.log("user deleted");
                //show error DIV
                alert(error);
                console.log(error);
            });

        }

        $scope.showHide = function (id) {
            console.log(document.getElementById(id).style.display);
            if (document.getElementById(id).style.display === 'block') {
                document.getElementById(id).style.display = 'none';
            }else{
                document.getElementById(id).style.display = 'block';
            }
        }
    }]);