var app = angular.module('shoppingApp',['ngRoute','ngStorage']);
app.config(function($routeProvider){
    $routeProvider
    .when("/",{
        templateUrl:'partials/list.html',
    }).when("/product/:id",{
        templateUrl:'partials/item.html',
        controller:'showProductCtrl'
    }).when('/cart',{
        templateUrl:'partials/cart.html',
        controller:'cartCtrl'
    }).when('/add-to-cart/:id',{
        templateUrl:'partials/add-to-cart.html'
    }).when('/checkout',{
        templateUrl:'partials/checkout.html'
    });
});

app.factory('Product',function(){
    var products = [
        {
            id:1,
            name:'Apple',
            description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price:10,
            image:'images/image-placeholder.png'
        },{
            id:2,
            name:'Banana',
            description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price:14,
            image:'images/image-placeholder.png'
        },{
            id:3,
            name:'Grapes',
            description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price:15,
            image:'images/image-placeholder.png'
        },{
            id:4,
            name:'Bottles',
            description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price:30,
            image:'images/image-placeholder.png'
        },{
            id:5,
            name:'Hand Sanitizer',
            description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price:25,
            image:'images/image-placeholder.png'
        },{
            id:6,
            name:'Mug',
            description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price:14,
            image:'images/image-placeholder.png'
        }
    ];
    return {
        all:function(){
            return products;
        },
        get:function(id){
            var result = null;
            angular.forEach(products, function(p){
                if(p.id == id){
                    result = p;
                }
            });
            return result;
        }
    };
});

// controller for product list
app.controller('shoppingCtrl',function($scope,Product,$sessionStorage){
    $scope.cart = [];
    $scope.storage = $sessionStorage;
    $scope.products = Product.all();
    // Initially add cart product if its in session storage
    console.log($scope.storage.cart);
    /*for (var x=0, i = $scope.stroage.cart.length; x <= i; x++) {
        $scope.stroage.cart.push()
    }*/

    $scope.addToCart = function(product){
        alreadyPresent = false;
        $scope.storage.cart.forEach(function(item){
            if(item.id == product.id){
                alreadyPresent = true;
            }
        });
        if(alreadyPresent){
            alert('Item already in cart');
        }else{
            $scope.storage.cart.push(angular.extend({quantity:1},product));
        }
    }
});

// Controller for product detials
app.controller('showProductCtrl',function($scope, $routeParams, Product,$sessionStorage){
    $scope.product = Product.get($routeParams.id);
    console.log($scope.product);
});

// cart controller
app.controller('cartCtrl',function($scope, Product, $sessionStorage){
    $scope.removeProduct = function($index){
        //var index = $scope.storage.cart.indexOf(item);
        $scope.storage.cart.splice($index, 1);    
    };
});