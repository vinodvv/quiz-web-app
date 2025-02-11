document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    const quizContainer = document.getElementById("quiz-container");
    const startScreen = document.getElementById("start-screen");
    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");
    const submitBtn = document.getElementById("submit-btn");
    const resultText = document.getElementById("result");

    let questions = JSON.parse(localStorage.getItem("questions")) || [];
    let currentQuestionIndex = 0;
    let selectedAnswer = null;

    startBtn.addEventListener("click", () => {
        if (questions.length === 0) {
            alert("No questions available! Please add questions first.");
            return;
        }
        startScreen.classList.add("hidden");
        quizContainer.classList.remove("hidden");
        loadQuestion();
    });

    function loadQuestion() {
        if (currentQuestionIndex >= questions.length) {
            resultText.innerText = "Quiz completed!";
            submitBtn.style.display = "none";
            return;
        }

        let question = questions[currentQuestionIndex];
        questionText.innerText = question.text;
        optionsContainer.innerHTML = "";

        question.options.forEach((option, index) => {
            let optionBtn = document.createElement("div");
            optionBtn.classList.add("option");
            optionBtn.innerText = option;
            optionBtn.addEventListener("click", () => {
                document.querySelectorAll(".option").forEach(btn => btn.classList.remove("selected"));
                optionBtn.classList.add("selected");
                selectedAnswer = index;
            });
            optionsContainer.appendChild(optionBtn);
        });
    }

    submitBtn.addEventListener("click", () => {
        if (selectedAnswer === null) {
            alert("Please select an answer.");
            return;
        }

        let correctAnswer = questions[currentQuestionIndex].correct;
        if (selectedAnswer === correctAnswer) {
            resultText.innerText = "Correct!";
            resultText.style.color = "green";
        } else {
            resultText.innerText = `Wrong! Correct answer: ${questions[currentQuestionIndex].options[correctAnswer]}`;
            resultText.style.color = "red";
        }

        setTimeout(() => {
            currentQuestionIndex++;
            selectedAnswer = null;
            loadQuestion();
        }, 2000);
    });
});
