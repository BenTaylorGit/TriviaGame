$(document).ready(function(){

    // start the game when user clicks on Start button
    $("#startButton").on("click", beginTimer);
  
  
  
    var timeLeft = 60;
  
    // start the timer, hide the start page, show the questions
     function beginTimer() {
      $("#timer").text("Trainer you have " + timeLeft + " seconds left!");
      setInterval(decrementTime, 1000);
      $("#timer").show();
      $("#start").hide();
      createQuestions();
    }
  
    // decrement the timer and update the UI; stop the timer at 0
    function decrementTime () {
      timeLeft--;
      $("#timer").text("Trainer you have " + timeLeft + " seconds left!");
      if (timeLeft === 0) {
        endTimer();
        $("#timer").empty();
      }
    }
  
    // stop the timer and check the answers
    function endTimer () {
      clearInterval();
      checkAnswers();
    }
  
  


  // functions to handle the building questions page and scoring
  
  
    // pull questions from the array of questions, loop through them, and append to UI
     function createQuestions() {
      var questionHolder = $("#questions");
             
      for (var i = 0; i < questionArray.length; i++) {
  
        questionHolder.append('<div id="question">' + questionArray[i].question + '</div>');
  
        var choiceOne = questionArray[i].answers[0];
        var choiceTwo = questionArray[i].answers[1];
        var choiceThree = questionArray[i].answers[2];
  
        questionHolder.append('<div class="form-check"><input type="radio" name="radio-group'+i+'" id="radio'+i+'"><label  id="radio'+i+'label" for="radio'+i+'">' + choiceOne + '</label></div>');
        questionHolder.append('<div class="form-check"><input type="radio" name="radio-group'+i+'" id="radio'+i+'"><label id="radio'+i+'label" for="radio'+i+'">' + choiceTwo + '</label></div>');
        questionHolder.append('<div class="form-check"><input type="radio" name="radio-group'+i+'" id="radio'+i+'"><label  id="radio'+i+'label" for="radio'+i+'">' + choiceThree + '</label></div>');
      }
  
      // add a Done button to the end of the page and register its click handler
      var submitButton = '<button class="btn btn-primary" id="doneButton" type="submit">Done</button>';
      questionHolder.append(submitButton);
      $("#doneButton").on("click", endTimer);
    }
  
    // test if the user answers are correct, incorrect, or if there are unanswered questions
     function checkAnswers() {
        var userCorrect = 0;
        var userIncorrect = 0;
        var userUnanswered = 0;
        var correctAnswer;
        var userAnswer;
      
  
      // loop through to compare the text of the label with the user answers
      // increment score counts appropriately
      for (var i = 0; i < questionArray.length; i++) {
        correctAnswer = questionArray[i].correct;
        userAnswer = $('input[id=radio'+i+']:checked + label').text();
  
        if (userAnswer === correctAnswer) {
          userCorrect++;
        } else if (userAnswer === "") {
          userUnanswered++;
        } else if (userAnswer !== correctAnswer) {
          {
            userIncorrect++;
          }
        }
      }

      $("#resultScreen").show();
      $("#questions").empty();
      $("#timer").empty();
      $("#timer").hide();
      $("#correctAnswers").text("Correct answers: " + userCorrect);
      $("#incorrectAnswers").text("Incorrect answers: " + userIncorrect);
      $("#unanswered").text("Unanswered questions: " + userUnanswered);

      if (userCorrect >= 8){
        $("#trainerType").text("Wow you're a Pokemon Master!");
      } else if (userCorrect >= 4){
        $("#trainerType").text("Wow you're a Pokemon Ace!");
      } else {
        $("#trainerType").text("Wow you're a Bug Catcher!");
      }

    }
  
  
  // array of objects with the questions, possible answers, and the correct answer
  var questionArray =
  [
    {
      question: "Who is the main human character in Pokemon?",
      answers: ["Ash Ketchum", "Brock", "Misty"],
      correct: "Ash Ketchum"
    },
  
    {
      question: "The most widely known Pokemon is?",
      answers: ["Charizard", "Mewtwo", "Pikachu"],
      correct: "Pikachu"
    },
    {
      question: "Which move type is super effective against Ghost type?",
      answers: ["Normal", "Ghost", "Water"],
      correct: "Ghost"
    },
    {
      question: "Which one of these Pokemon is a started in Generation 3 of the Pokemon Video Game series?",
      answers: ["Totodile", "Mudkip", "Froakie"],
      correct: "Mudkip"
    },
    {
      question: "What is the largest Pokemon?",
      answers: ["Wailord", "Kyogre", "Giratina"],
      correct: "Wailord"
    },
    {
      question: "Which Pokemon loves to eat and sleep?",
      answers: ["Snorlax", "Slakoth", "Abra"],
      correct: "Snorlax"
    },
    {
      question: "What was the release date for the original Pokemon Red and Green versions in Japan?",
      answers: ["January 7th, 1995", "September 28th, 1998", "February 27th, 1996"],
      correct: "February 27th, 1996"
    },
    {
      question: "Who is always trying to steal Ash's Pikachu?",
      answers: ["Team Rocket", "Team Magma", "Team Skull"],
      correct: "Team Rocket"
    },
    {
      question: "What generation of Pokemon did Mega Evolutions first appear in?",
      answers: ["Generation IV", "Generation V", "Generation VI"],
      correct: "Generation VI"
    },
    {
      question: "Gotta Catch 'Em All....",
      answers: ["Pokemon", "Digimon","MonMon"],
      correct: "Pokemon"
    }
  ]

});