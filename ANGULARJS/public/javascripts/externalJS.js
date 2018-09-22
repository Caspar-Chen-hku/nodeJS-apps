var commodity_app = angular.module('commodityListApp', []);

commodity_app.controller('commodityListController', function($scope, $http){

    //to be completed
    $scope.commodities = null; 
    $scope.updateStatusOrNot={}; 
    $scope.new_status={}; 

    $scope.getCommodities = function(){         
        $http.get("/users/commodities").then(function(response){             
            $scope.commodities = response.data;      
            for (var i=0; i<$scope.commodities.length; i++){                 
                var commodity = ($scope.commodities)[i];   
                $scope.updateStatusOrNot[commodity._id]=false;     
                $scope.new_status[commodity._id]="";   }         
            }, function(response){             
                alert("Error getting commodity:"+response.statusText);         
            });     
    }; 

    $scope.new_commodity = {categoty:"", name:"", status:""}; 
 
    $scope.addNewCommodity = function(){    
        if($scope.new_commodity.name==''||$scope.new_commodity.category==''|| $scope.new_commodity.status==''){
            alert("please fill in all fields");         
            return;       
        }           
        $http.post('/users/addcommodity', $scope.new_commodity).then(function(response){         
            if(response.data.msg===''){           
                $scope.new_commodity = {category:"", name:"", status:""};           
                $scope.getCommodities();          
            }else{           
                alert("Error adding commodity:"+response.data.msg);         
            }       
        }, function(response){           
            alert("Error adding commodity:"+response.statusText);       
        }); 
    }; 

     $scope.deleteCommodity = function(id){         
        var url = '/users/deletecommodity/'+id; 
        $http.delete(url).then(function(response){             
            $scope.getCommodities();                  
        }, function(response){             
            alert("Error deleting commodity:"+response.statusText);             
        });     
    }; 

    $scope.showStatusOptions = function(id){               
        $scope.updateStatusOrNot[id]=true;       
    } 
 
    $scope.updateCommodity = function(id){         
        if ($scope.new_status[id] === ""){             
            alert('Please select status');             
            return false;                
        }else{                
            var changeStatus = {
                'status':$scope.new_status[id]
            };
            $http.put('/users/updatecommodity/'+id, changeStatus).then(function(response){                 
                 $scope.getCommodities();             
            },function(response){                 
                alert("Error updating commodity:"+response.data.msg);             
            });         
        }     
    } 
  

 
 
  

});

