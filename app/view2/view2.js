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

        $scope.sortByUserName = function(){
            console.log("abc");
            $scope.userArray.sort((a, b) => (a.username > b.username) ? 1 : -1);
        }

        $httpClient.get("http://localhost:9000/api/rest/User.svc/users").then(function (response) {
            console.log(response.data);
            $scope.userArray = response.data;
        }).catch(function (error) {
            console.log(error);
        });


        $scope.deleteUser = function (id, username) {
            if (confirm("Are you sure to delete: " + username + " ?")) {
                $httpClient.put("http://localhost:9000/api/rest/User.svc/user(" + id + ")").then(function (response) {
                    $scope.userArray = $scope.userArray.filter(user => user.id !== id);
                }).catch(function (error) {
                    console.log("user deleted");
                    //show error DIV
                    alert(error);
                    console.log(error);
                });
            }
        }

        $scope.deleteBook = function (id, bookName) {
            if (confirm("Are you sure to delete: " + bookName + " ?")) {
                $httpClient.delete("http://localhost:9000/api/rest/Book.svc/book(" + id + ")")
                    .then(function (response) {
                        $scope.userArray.map(user => {
                            user.bookDTOSet = user.bookDTOSet.filter(book => book.id !== id);
                        });
                }).catch(function (error) {
                    console.log("book deleted");
                    //show error DIV
                    alert(error);
                    console.log(error);
                });
            }
        }


        $scope.editUser = function (id) {
            document.getElementById("tr_"+id).style.background = "yellow";
            document.getElementById("span_delete_"+id).className = "fa fa-times";
            document.getElementById("span_edit_"+id).className = "fa fa-save";

            document.getElementById("username_" + id).contentEditable = true;
            document.getElementById("personalCode_" + id).contentEditable = true;
            document.getElementById("address_" + id).contentEditable = true;
            document.getElementById("favoriteBook_" + id).contentEditable = true;
/*
            document.getElementById("delete_" + id).contentEditable = true;
            document.getElementById("edit_" + id).contentEditable = true;
*/

            console.log(id);
        }

        $scope.showHide = function (id) {
            console.log(document.getElementById(id).style.display);
            if (document.getElementById(id).style.display === 'block') {
                document.getElementById(id).style.display = 'none';
            } else {
                document.getElementById(id).style.display = 'block';
            }
        }
    }]);