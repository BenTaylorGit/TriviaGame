$(document).ready(function () {

    // creating a variable to store the initial time for the game
    var timeLeft = 60;

    //jquery for onclick event on the startButton found in the html doc, when clicked starts the timer and game
    $("#startButton").on("click", beginTimer);

    //function that starts the timer and shows the timer in the tag, hides the start screen div content, and calls the createQuestions function
    function beginTimer() {
        $("#timer").text("Trainer you have " + timeLeft + " seconds left!");
        setInterval(decrementTime, 1000);
        $("#timer").show();
        $("#start").hide();
        createQuestions();
    }

    //function that decrements the timer and checks to see if time has reach zero, if so calls the endTimer function
    function decrementTime() {
        timeLeft--;
        $("#timer").text("Trainer you have " + timeLeft + " seconds left!");
        if (timeLeft === 0) {
            endTimer();
            $("#timer").empty();
        }
    }

    //function that clears the timer interval and calls the checkAnswers function
    function endTimer() {
        clearInterval();
        checkAnswers();
    }

    //function that creates all of the questions and answers dynamically on the screen, as well as the submit button
    function createQuestions() {

        //varuavke that sets itself equal to the questions div in the html doc
        var questionHolder = $("#questions");

        //for loop that iterates through the question array
        for (var i = 0; i < questionArray.length; i++) {

            //appends new divs with each question found in the question array to the questions div on the html doc
            questionHolder.append('<div id="question">' + questionArray[i].question + '</div>');

            //append each of the answers to the questions div on the html doc, this creates a new div with bootstrap classes for each answer
            questionHolder.append('<div class="form-check"><input type="radio" name="radio-group' + i + '" id="radio' + i + '"><label  id="radio' + i + 'label" for="radio' + i + '">' + questionArray[i].answers[0] + '</label></div>');
            questionHolder.append('<div class="form-check"><input type="radio" name="radio-group' + i + '" id="radio' + i + '"><label id="radio' + i + 'label" for="radio' + i + '">' + questionArray[i].answers[1] + '</label></div>');
            questionHolder.append('<div class="form-check"><input type="radio" name="radio-group' + i + '" id="radio' + i + '"><label  id="radio' + i + 'label" for="radio' + i + '">' + questionArray[i].answers[2] + '</label></div>');
        }

        //create a new button that gets appened the questions div on the html doc
        var submitButton = '<button class="btn btn-primary" id="doneButton" type="submit">Done</button>';
        questionHolder.append(submitButton);

        //when the button is clicked call the stop timer function
        $("#doneButton").on("click", endTimer);
    }

    //function that checks the users answers and displays the users results on the screen
    function checkAnswers() {

        var userCorrect = 0; //variable to store the number of correct answers by the user
        var userIncorrect = 0; //variable to store the number of uincorrect answers by the user
        var userUnanswered = 0; //variable to store the number of unanswered answers by the user
        var correctAnswer; //variable to store the correct answer from the questionsArray
        var userAnswer; //variable to store users answer

        //for loop that iterates through the questions array and gets each answer and compares it to the users answer
        for (var i = 0; i < questionArray.length; i++) {

            //sets the correctAnswer equal to the correct answer of the current question
            correctAnswer = questionArray[i].correct;

            //sets the userAnswer equal to the the radio button the user selected
            userAnswer = $('input[id=radio' + i + ']:checked + label').text();

            //logic to the check each answer and increments the correct, incorrect, or unanswered variable accordingly
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

        $("#resultScreen").show(); //jquery that shows the result screen
        $("#questions").empty(); //jquery that empties the questions div
        $("#timer").hide(); //jquery that hides the timer tag from the screen
        $("#timer").empty(); //jquery that empties the timer tag
        $("#correctAnswers").text("Correct answers: " + userCorrect); // adds text to the correctAnswer tag with the users score
        $("#incorrectAnswers").text("Incorrect answers: " + userIncorrect); // adds text to the incorrectAnswer tag with the users score
        $("#unanswered").text("Unanswered questions: " + userUnanswered); // adds text to the unAnswered tag with the users score

        //If statement that adds text to the result screen based on the users score and defines them as a type of trainer
        if (userCorrect >= 8) {
            $("#trainerType").text("Wow you're a Pokemon Master!");
        } else if (userCorrect >= 4) {
            $("#trainerType").text("Wow you're a Pokemon Ace!");
        } else {
            $("#trainerType").text("Wow you're a Bug Catcher!");
        }

    }

    //An array with objects inside of it that house each question, the possible answers to that question, and the correct answer to that question.
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
                answers: ["Pokemon", "Digimon", "MonMon"],
                correct: "Pokemon"
            }
        ]

});