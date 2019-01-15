(function() {

    angular
        .module("turtleFacts")
        .controller("listCtrl", ListController);

        ListController.$inject = ['quizMetrics', 'DataService'];

        function ListController(quizMetrics, DataService) {

            var vm = this;

            vm.quizMetrics = quizMetrics;
            vm.data = DataService.turtlesData;
            vm.activeTurtle = {};
            vm.search = '';
              
            vm.changeActiveTurtle = function(index) {
                vm.activeTurtle = index;
            }
    
            vm.activateQuiz = function() {
              quizMetrics.changeState("quiz", true);
            }
    
    
    
        }

})();