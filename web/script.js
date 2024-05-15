const questions = [
    {
        question: "Which of the following is not a valid variable name in Python?",
        answers: [
            {text: "my_var", correct: false},
            {text: "1_var", correct: true},
            {text: " _var_1", correct: false},
            {text: "var_1", correct: false},
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            {text: "Creative Style Syntax", correct: false},
            {text: "Cascading Style Sheets", correct: true},
            {text: "Computer Style Sheets", correct: false},
            {text: "Cascading Sheet Syntax", correct: false},
        ]        
    },
    {
        question: "In JavaScript, which function is used to print content to the console?",
        answers: [
            {text: "print()", correct: false},
            {text: "log()", correct: false},
            {text: " display()", correct: false},
            {text: "console.log()", correct: true},
        ]        
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            {text: "Vetican City", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Shri Lanka", correct: false},
        ]        
    },
    {
        question: "Which data structure uses LIFO (Last In, First Out) ordering?",
        answers: [
            {text: " Queue", correct: false},
            {text: "Stack", correct: true},
            {text: "Linked List", correct: false},
            {text: "Tree", correct: false},
        ]        
    },

];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
 
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function dingSound(){
    let ding = new Audio ('sounds/ding.mp3');
    ding.play();
}

function wrongSound(){
    let wrong = new Audio ('sounds/wrong-answer.mp3');
    wrong.play();
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        dingSound();
        selectedBtn.classList.add("correct"); 
        score++;
    }else{
        wrongSound();
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}


function showScore(){
    resetState();
    let userScore = `You scored ${score} out of ${questions.length}.`;
    questionElement.innerHTML = userScore;
    questionElement.style.textAlign = "center"; // Align the text at the center
    nextButton.innerHTML = "Play Again?";
    nextButton.style.display = "block";
    
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();
