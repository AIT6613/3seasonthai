var app = angular.module('myApp', []);

app.controller('OrderManagementCtrl', function ($scope, $http) {

  angular.element(document).ready(function () {
    $scope.URL = 'http://ec2-3-14-6-238.us-east-2.compute.amazonaws.com:3000';

    // Set start filter
    $scope.mySortType = "true";
    $scope.findStatus = "";
    
    $scope.orders = [];
    $scope.orderDetails = [];
    $scope.deliveryAddresses = [];
    $scope.orderList = [];

    $scope.getAllOrderByCurrentDate();
    $scope.getAllDeliveryAddress();
    $scope.getOrderList();
    $scope.setCheckOrderInterval();

    
  });

  $scope.setCheckOrderInterval = function () {
    setInterval(function(){ $scope.getAllOrder(); }, 3000);

  }

  $scope.playAlert = function(){
    document.getElementById('alert-sound').play();
  }

  // get all order
  $scope.getAllOrderByCurrentDate = function () {
    $http.get($scope.URL + "/api/orders/get/all/orderByCurrentDate")
      .then(function mySuccess(response) {
        $scope.orders = response.data.data;
        //console.log($scope.orders);
        
        // check if have new order in the list,
        // aleart sound
        var newOrders = $scope.orders.filter((item)=>{
          return item.status == 'New Order';
        });
      
        if (newOrders.length > 0){
          $scope.playAlert();
        }
        
      }, function myError(response) {
        alert("Get all order fail.");
      });
  }

  // get all order detail
  $scope.getAllOrderDetail = function () {
    $http.get($scope.URL + "/api/orders/get/all/orderDetail")
      .then(function mySuccess(response) {
        $scope.orderDetails = response.data.data;
        console.log($scope.orderDetails);
        
      }, function myError(response) {
        alert("Get all order detail fail.");
      });
  }

  // get all delivery address
  $scope.getAllDeliveryAddress = function () {
    $http.get($scope.URL + "/api/orders/get/all/deliveryAddress")
      .then(function mySuccess(response) {
        $scope.deliveryAddresses = response.data.data;
        
      }, function myError(response) {
        alert("Get all delivery address fail.");
      });
  }

  // get all menu
  $scope.getOrderList = function () {
    $http.get($scope.URL + "/api/orders/get/all/orderList")
      .then(function mySuccess(response) {
        $scope.orderList = response.data.data;
        
      }, function myError(response) {
        alert("Get all menu fail.");
      });
  }

  // change order status
  $scope.changeOrderStatus = function(id,status){
    $http.put($scope.URL + "/api/orders/update/orderStatus",{
      id: id,
      status: status
    })
    .then(function mySuccess(response) {
      $scope.getAllOrder();
      console.log(response);
    }, function myError(response) {
      alert("update order status fail.");
    });
  }

  // Sort Table function
  $scope.orderByMe = function (name) {
    if ($scope.myOrderBy == name) {
      if ($scope.mySortType == "") {
        $scope.mySortType = "true";
      } else {
        $scope.mySortType = "";
      }
    } else {
      $scope.mySortType = "";
    }
    $scope.myOrderBy = name;

  }

  $scope.updateSearchKey = function (keyEvent, searchField) {
    /*
    if (keyEvent.which==13 && searchField=="studentID") {
      $scope.searchStudentID = $scope.findStudentID;
    }

    if (keyEvent.which==13 && searchField=="studentName") {
      $scope.searchStudentName = $scope.findName;
    }
    */
  }

});










