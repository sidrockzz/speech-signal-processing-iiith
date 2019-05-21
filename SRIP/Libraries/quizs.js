var myQuestions = [
    {
        question: "At which type of spectrogram, we will be able to see the formant?",
        answers: {
            a: 'Narrowband and dark',
            b: 'Wideband and light',
            c: 'Narrowband and light',
            d: 'Wideband and dark'
        },
        correctAnswer: 'd'
    },
    {
        question: "What are its limitations?",
        answers: {
            a: 'Reverting the signal acquired by spectrogram is reversible.',
            b: 'Heinsenberg Uncertainity principle is not applied',
            c: 'Time delay',
            d: 'None of the above'
        },
        correctAnswer: 'c'
    },
   {
        question: "What is an Formant?",
        answers: {
            a: 'The spectral shaping that results from an acoustic resonance of the human vocal tract.',
            b: 'Concentration of acoustic energy around a particular frequency in the speech wave.',
            c: 'The peaks that are observed in the spectrum envelope.',
            d: 'All of the Above.'
        },
        correctAnswer: 'd'
    },
    {
        question: "Why do we have to apply FFT to Spectrogram?",
        answers: {
           a: 'In order to analyze the frequency content of a finite duration discrete time signal in N samples',
           b: 'Fast algorithms for discrete cosine or sine transforms.',
           c: 'Both a and b.',
           d: 'None of the above.'
        },
       correctAnswer: 'c'
    },
    {
        question: "Time resolution is ___________ to the frequency resolution.",
        answers:{
           a: 'Inversely proportional.',
           b: 'Directly proportional.',
           c: 'None of the above.',
           d: 'No relation between the two parameters.'
        },
        correctAnswer: 'a'
    },
];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

    function showQuestions(questions, quizContainer){
        // we'll need a place to store the output and the answer choices
        var output = [];
        var answers;

        // for each question...
        for(var i=0; i<questions.length; i++){
            
            // first reset the list of answers
            answers = [];

            // for each available answer...
            for(letter in questions[i].answers){

                // ...add an html radio button
                answers.push(
                    '<label>'
                        + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                        + letter + ': '
                        + questions[i].answers[letter]
                    + '</label>'
                );
            }

            // add this question and its answers to the output
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        // finally combine our output list into one string of html and put it on the page
        quizContainer.innerHTML = output.join('');
    }


    function showResults(questions, quizContainer, resultsContainer){
        
        // gather answer containers from our quiz
        var answerContainers = quizContainer.querySelectorAll('.answers');
        
        // keep track of user's answers
        var userAnswer = '';
        var numCorrect = 0;
        
        // for each question...
        for(var i=0; i<questions.length; i++){

            // find selected answer
            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
            
            // if answer is correct
            if(userAnswer===questions[i].correctAnswer){
                // add to the number of correct answers
                numCorrect++;
                
                // color the answers green
                answerContainers[i].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else{
                // color the answers red
                answerContainers[i].style.color = 'red';
            }
        }

        // show number of correct answers out of total
        resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
    }

    // show questions right away
    showQuestions(questions, quizContainer);
    
    // on submit, show results
    submitButton.onclick = function(){
        showResults(questions, quizContainer, resultsContainer);
    }

}
