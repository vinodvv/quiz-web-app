document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("question-form");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            let questions = JSON.parse(localStorage.getItem("questions")) || [];
            let newQuestion = {
                text: document.getElementById("question").value,
                options: [
                    document.getElementById("option1").value,
                    document.getElementById("option2").value,
                    document.getElementById("option3").value,
                    document.getElementById("option4").value,
                ],
                correct: parseInt(document.getElementById("correct-answer").value) - 1,
            };

            questions.push(newQuestion);
            localStorage.setItem("questions", JSON.stringify(questions));

            alert("Question added successfully!");
            form.reset();
        });
    }
});
