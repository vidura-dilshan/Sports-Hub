// setting the questions and answers into  an array.
const questions = [
    {
        question: "What is the name of the first ice hockey club?",
        answers: [
            { text: "Boston Bruins", correct: false},
            { text: "McGill university Hockey club", correct: true},  // marking the coreect as true and incorrect answers as false.
            { text: "Edmonton Oilers", correct: false},
            { text: "Montreal canadiens", correct: false},
        ]
    },
    {
        question: "how many pieces does each side of a chess set have?",
        answers: [
            { text: "15 per side", correct: false},
            { text: "11 per side", correct: false},
            { text: "14 per side", correct: false},
            { text: "16 per side", correct: true},
        ]
    },
    {
        question: "Who invented the sport basketball?",
        answers: [
            { text: "Ebenezer Morley", correct: false},
            { text: "James Naismith", correct: true},
            { text: "Mills Commission", correct: false},
            { text: "Lizzie Magie", correct: false},
        ]
    },
    {
        question: "What is the length and width of a cricket pitch?",
        answers: [
            { text: "flat surface 26 yards", correct: false},
            { text: "flat surface 30 yards", correct: false},
            { text: "flat surface 29 yards", correct: false},
            { text: "flat surface 22 yards", correct: true},
        ]
    },
    {
        question: "How many members are there in a ice hockey team?",
        answers: [
            { text: "6 members", correct: true},
            { text: "5 members", correct: false},
            { text: "7 members", correct: false},
            { text: "8 members", correct: false},
        ]
    },
    {
        question: "How many players are there in a cricket team?",
        answers: [
            { text: "12", correct: false},
            { text: "11", correct: true},
            { text: "10", correct: false},
            { text: "9", correct: false},
        ]
    },
    {
        question: "Who is the first ever world champion in chess?",
        answers: [
            { text: "Bobby Fischer", correct: false},
            { text: "Anatoly Karpov", correct: false},
            { text: "Garry Kasparov", correct: false},
            { text: "Wilhelm Steinitz", correct: true},
        ]
    },
    {
        question: "When was the first indoor ice hockey tournament held?",
        answers: [
            { text: "1874 march 3", correct: false},
            { text: "1875 march 3", correct: true},
            { text: "1877 march 3", correct: false},
            { text: "1876 march 3", correct: false},
        ]
    },
    {
        question: "how many illegal moves are allowed in a standard chess game?",
        answers: [
            { text: "1", correct: false},
            { text: "3", correct: false},
            { text: "2", correct: true},
            { text: "5", correct: false},
        ]
    },
    {
        question: "When was the fisrt international cricket match was held?",
        answers: [
            { text: "in 1841", correct: false},
            { text: "in 1844", correct: true},
            { text: "in 1849", correct: false},
            { text: "in 1845", correct: false},
        ]
    },
];

//Adding HTML varriables.
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer_btns");
const nextButton = document.getElementById("next_btn");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;  //Adding the varriable currentQuestionIndex to store the question index.
let score = 0;      //Adding the varriable score to store the score.
let timeLeft = 60;
let timerId;

//creating the function startQuiz to start the quizeApp
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    nextButton.innerHTML = "Next Question"  //changing the text of the nextButton to "Next".
    showQuestion();     //calling to the methods showQuestion and startTimer.
    startTimer();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];   //setting the variable CurrentQuestion to the index of the questions Array.
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;   //displaying the question with the question number.

    //displaying the answers from the questions.
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");    //asigning the button tag to a variable name button.
        button.innerHTML = answer.text;     //adding the answers to the varrible button.
        button.classList.add("btn");        //adding the class name btn to the varaible button. 
        answerButtons.appendChild(button);      //displaying the button inside the answerButtons.
        if(answer.correct){
            button.dataset.correct = answer.correct;       //adding to the button the true or false answers.
        }
        button.addEventListener("click", selectAnswer);    //adding the click option to the answerButtons by calling the selectAnswer method.
    });
}

//reffered from W3 Schools.
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);       //removing the previous answers
    }
}

//referd from W3 Schools.
function selectAnswer(e){
    const selectedBtn = e.target;       //adding the selectedBtn element when we clicked on the button.
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");   //if the selectedBtn dataset is true it will add the class name correct.
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect")      //if the selectedBtn dataset is false it will add the class name incorrect.
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){      //checking each button dataset and if it is true, then it will add the class name correct.
            button.classList.add("correct");
        }
        button.disabled = true;     //disabling the answer buttons after selecting one answer.
    });
    nextButton.style.display = "block";     //displaying the next Question button.
}

function showScore(){
    resetState();
    clearInterval(timerId);
    let timeTaken = 60 - timeLeft;
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} in ${timeTaken} seconds!`;
    nextButton.innerHTML = "Start Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})


/*------------Quiz Timer-------------------*/

//refered from Stackoverflow.
function startTimer(){
    timerId = setInterval(() => {
        timeLeft --;
        timerElement.innerHTML = `Time Left : ${timeLeft}`;
        if(timeLeft <= 0){
            clearInterval(timerId);
            showScore();
        }
    }, 1000);     //this code inside the startTimer function should run every 1000 milliseconds (1 second).
}

startQuiz();