
(function() 
 {
  var allQuestions = [{
    question: "At which type of spectrogram, we will be able to see the formant?",
    options: ["Narrowband and dark", "Wideband and light", "Narrowband and light", "Wideband and dark"],
    answer: 3
  }, {
    question: "What are its limitations?",
    options: ["Reverting the signal acquired by spectrogram is reversible.", "Heinsenberg Uncertainity principle is not applied", "Time delay", "None of the above"],
    answer: 2
  }, {
    question: "What is an Formant?",
    options: ["The spectral shaping that results from an acoustic resonance of the human vocal tract.", "Concentration of acoustic energy around a particular frequency in the speech wave.", "The peaks that are observed in the spectrum envelope.","All of the Above."],
    answer: 3
  },{
    question: "Why do we have to apply FFT to Spectrogram?",
    options: ["In order to analyze the frequency content of a finite duration discrete time signal in N samples.", "Fast algorithms for discrete cosine or sine transforms.", "Both a and b.", "None of the above."],
    answer: 2
  }, {
    question: "Time resolution is ___________ to the frequency resolution.",
    options: ["Inversely proportional.", "Directly proportional.", "None of the above.", "No relation between the two parameters."],
    answer: 1
    }];
  
  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');
  
  var rand= Math.floor(Math.random() * allQuestions.length);
    
  nextQuestion();
    
  $('#next').click(function () 
    {
        chooseOption();
        if (isNaN(selectOptions[rand])) 
        {
            alert('Please select an option !');
        } 
        else 
        {
          quesCounter++;
          nextQuestion();
        }
    });
  
  $('#prev').click(function () 
    {
        chooseOption();
        quesCounter--;
        nextQuestion();
    });
  
  function createElement(rand) 
    {
        var element = $('<div>',{id: 'question'});
        var header = $('<h2>Question No. ' + (rand + 1) + ' :</h2>');
        element.append(header);

        var question = $('<p>').append(allQuestions[rand].question);
        element.append(question);

        var radio = radioButtons(rand);
        element.append(radio);

        return element;
    }
  
  function radioButtons(rand) 
    {
        var radioItems = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[rand].options.length; i++) {
          item = $('<li>');
          input = '<input type="radio" name="answer" value=' + i + ' />';
          input += allQuestions[rand].options[i];
          item.append(input);
          radioItems.append(item);
        }
        return radioItems;
  }
  
  function chooseOption() 
    {
        selectOptions[rand] = +$('input[name="answer"]:checked').val();
    }
   
  function nextQuestion() 
    {
        quizSpace.fadeOut(function() 
            {
              var rand= Math.floor(Math.random() * allQuestions.length);
              $('#question').remove();
              if(quesCounter < allQuestions.length)
                {
                    
                    var nextQuestion = createElement(rand);
                    quizSpace.append(nextQuestion).fadeIn();
                    if (!(isNaN(selectOptions[rand]))) 
                    {
                      $('input[value='+selectOptions[rand]+']').prop('checked', true);
                    }
                    if(quesCounter === 1)
                    {
                      $('#prev').show();
                    } 
                    else if(quesCounter === 0)
                    {
                      $('#prev').hide();
                      $('#next').show();
                    }
                }
              else 
                {
                    var scoreRslt = displayResult();
                    quizSpace.append(scoreRslt).fadeIn();
                    $('#next').hide();
                    $('#prev').hide();
                }
        });
    }
  
  function displayResult() 
    {
        var score = $('<p>',{id: 'question'});
        var correct = 0;
        var wrong = 0;
        for (var i = 0; i < selectOptions.length; i++) 
        {
          if (selectOptions[i] === allQuestions[i].answer) 
          {
            correct++;
          }
        }
          if(selectOptions[0] !== allQuestions[0].answer)
          {
           score.append('You have entered wrong option' + " " +selectOptions[0] +" " + 'The correct answer is D' +" " + allQuestions[0].answer + " " +  'Wideband and Dark i.e because corresponds to a resonance in the vocal tract. Formants can be seen very clearly in a wideband spectrogram, where they are displayed as dark bands. The darker a formant is reproduced in the spectrogram, the stronger it is. </br>');
          }
          if(selectOptions[1] !== allQuestions[1].answer)
          {
           score.append('You have entered wrong option' + " " + selectOptions[1] + " " +  'The correct answer is ' + " " + allQuestions[1].answer + 'Time delay - Duality of Instantaneous Frequency </br>');
          }
          if(selectOptions[2] !== allQuestions[2].answer)
          {
           score.append('You have entered wrong option' + " " + selectOptions[2] +" " + 'The correct answer is ' + allQuestions[2].answer + 'all the above </br>');
          }
          if(selectOptions[3] !== allQuestions[3].answer)
          {
           score.append('You have entered wrong option' + " "+ selectOptions[3] +" " + 'The correct answer is ' + allQuestions[3].answer + 'Both a and b - FFT is used for creating the spectrograph and understanding in the mathematical manner </br>');
          }
          if(selectOptions[4] !== allQuestions[4].answer)
          {
           score.append('You have entered wrong option' + " "+ selectOptions[4] + " " + 'The correct answer is ' + allQuestions[4].answer + 'inversely proportional T = T0 /N </br>');
          }           
          
 
        
        score.append('You scored ' + correct + ' out of ' +allQuestions.length);
        return score;
  }
})();
