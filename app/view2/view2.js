'use strict';

function switchUserViewMode(id) {
    document.getElementById("state_" + id).value = "VIEW";
    document.getElementById("tr_" + id).style.background = "white";
    document.getElementById("span_delete_" + id).className = "fa fa-trash";
    document.getElementById("span_edit_" + id).className = "fa fa-edit";

    document.getElementById("username_" + id).contentEditable = false;
    document.getElementById("personalCode_" + id).contentEditable = false;
    document.getElementById("address_" + id).contentEditable = false;
    document.getElementById("favoriteBook_" + id).contentEditable = false;
}
angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }]).controller('View2Ctrl', ['$scope', '$http', '$route', function ($scope, $httpClient, $route) {

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
            if(document.getElementById("state_"+id).value === "VIEW"){
                if (confirm("Are you sure to delete: " + username + " ?")) {
                    $httpClient.delete("http://localhost:9000/api/rest/User.svc/user(" + id + ")").then(function (response) {
                        $scope.userArray = $scope.userArray.filter(user => user.id !== id);
                    }).catch(function (error) {
                        console.log("user deleted");
                        //show error DIV
                        alert(error);
                        console.log(error);
                    });
                }
            }else{
                //cancel edit
                switchUserViewMode(id);
                $route.reload();
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
            if (document.getElementById("state_" + id).value === "VIEW") {
                document.getElementById("state_" + id).value = "EDIT";
                document.getElementById("tr_" + id).style.background = "yellow";
                document.getElementById("span_delete_" + id).className = "fa fa-times";
                document.getElementById("span_edit_" + id).className = "fa fa-save";

                document.getElementById("username_" + id).contentEditable = true;
                document.getElementById("personalCode_" + id).contentEditable = true;
                document.getElementById("address_" + id).contentEditable = true;
                document.getElementById("favoriteBook_" + id).contentEditable = true;
            } else {
                //UPDATE



                var userDTO = {
                    username: document.getElementById("username_"+id).innerText,
                    personalCode: document.getElementById("personalCode_"+id).innerText,
                    address: document.getElementById("address_"+id).innerText,
                    favoriteBook: document.getElementById("favoriteBook_"+id).innerText
                };

                var submitData = JSON.stringify(userDTO);
                console.log(userDTO);
                $httpClient.put("http://localhost:9000/api/rest/User.svc/user(" + id + ")", submitData)
                    .then(function (response) {
                        console.log(response.data);
                        if (response.data.error === true) {
                            var errorDiv = document.getElementById("isa_error");
                            errorDiv.style.display = 'block';
                            document.getElementById("error_msg_text").innerHTML = response.data.message;
                            setTimeout(function () {
                                errorDiv.style.display = 'none';
                            }, 3000);
                        } else {
                            $route.reload();
                            switchUserViewMode(id);
                        }
                    });
            }
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