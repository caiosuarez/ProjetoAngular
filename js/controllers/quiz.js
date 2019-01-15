(function() {

    angular
        .module("turtleFacts")
        .controller("quizCtrl", QuizController);

        QuizController.$inject = ['quizMetrics', 'DataService'];

        function QuizController(quizMetrics, DataService) {
            
            var vm = this;

            vm.quizMetrics = quizMetrics;
            vm.dataService = DataService;
            vm.questionAnswered = questionAnswered;
            vm.setActiveQuestion = setActiveQuestion;
            vm.selectAnswer = selectAnswer;
            vm.finalizeAnswer = finalizeAnswer;
            vm.activeQuestion = 0;
            vm.error = false;
            vm.finalize = false;

            var numQuestionAnswered = 0;

            function setActiveQuestion(index) {
                if(index === undefined) {
                    var breakout = false;
                    var quizLength = DataService.quizQuestions.length -1;
    
                    while(!breakout) {
                        vm.activeQuestion = vm.activeQuestion < quizLength?++vm.activeQuestion:0;

                        if(vm.activeQuestion  === 0) {
                            vm.error = true;
                        }
    
                        if(DataService.quizQuestions[vm.activeQuestion].selected === null) {
                            breakout = true;
                        }
                    }
                } else {
                    vm.activeQuestion = index;
                }


            }

            function questionAnswered() {

                var quizLength = DataService.quizQuestions.length;
                
                if(DataService.quizQuestions[vm.activeQuestion].selected !== null) {
                    numQuestionAnswered++;
                    if(numQuestionAnswered >= quizLength) {
                        //finalize quiz
                        for(var i = 0; i < quizLength; i++) {
                            if(DataService.quizQuestions[i].selected === null) {
                                setActiveQuestion(i);
                                return;
                            }
                        }
                        vm.error = false;
                        vm.finalize = true;
                        return;
                    }
                }
                vm.setActiveQuestion();
            }


            function selectAnswer(index) {
                DataService.quizQuestions[vm.activeQuestion].selected = index;
            }

            function finalizeAnswer() {
                vm.finalize = false;
                numQuestionAnswered = 0;
                vm.activeQuestion = 0;
                quizMetrics.markQuiz();
                quizMetrics.changeState("quiz", false);
                quizMetrics.changeState("results", true);
            }

        }


       

})();