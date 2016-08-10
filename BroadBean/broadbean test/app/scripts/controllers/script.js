var app = angular.module('myApp', []);

app.controller('myCtrl', function($timeout,$scope,$http) {
  var persons=[];
  function PersonsPush(person){
    	  var numOfPersons = person.length;
    for (var i = 0; i < numOfPersons; i++) {
      var ran=Math.ceil(person[i].metacriticScore)%10;
      if(ran>0){
        ran=Math.ceil(person[i].metacriticScore)+10-ran;
      }else{
        ran=Math.ceil(person[i].metacriticScore);
      }
      persons.push({
        score:Math.ceil(person[i].metacriticScore),
        title: person[i].title,
        range: ran
      });
    }
    	}
    	
      $http.get('http://www.cheapshark.com/api/1.0/deals').success(function(data){
    var person_json = data;
    $scope.person_json=person_json;
    PersonsPush($scope.person_json);
    });
    
      $scope.persons=persons;
    
});
app.filter('groupBy', ['$parse', function ($parse) {
    return function (list, group_by) {

        var filtered = [];
        var prev_item = null;
        var group_changed = false;
        // this is a new field which is added to each item where we append "_CHANGED"
        // to indicate a field change in the list
        //was var new_field = group_by + '_CHANGED'; - JB 12/17/2013
        var new_field = 'group_by_CHANGED';

        // loop through each item in the list
        angular.forEach(list, function (item) {

            group_changed = false;

            // if not the first item
            if (prev_item !== null) {

                // check if any of the group by field changed
                
                //force group_by into Array
                group_by = angular.isArray(group_by) ? group_by : [group_by]; 
                
                //check each group by parameter
                for (var i = 0, len = group_by.length; i < len; i++) {
                    if ($parse(group_by[i])(prev_item) !== $parse(group_by[i])(item)) {
                        group_changed = true;
                    }
                }

                
            }// otherwise we have the first item in the list which is new
            else {
                group_changed = true;
            }

            // if the group changed, then add a new field to the item
            // to indicate this
            if (group_changed) {
                item[new_field] = true;
            } else {
                item[new_field] = false;
            }

            filtered.push(item);
            prev_item = item;

        });

        return filtered;
    };
}]);
