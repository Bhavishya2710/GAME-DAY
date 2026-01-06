const notesInput = document.getElementById("notesInput");
const generateBtn = document.getElementById("generateBtn");

const quizSection = document.getElementById("quizSection");
const inputSection = document.getElementById("inputSection");
const resultSection = document.getElementById("resultSection");

const questionTitle = document.getElementById("questionTitle");
const optionsDiv = document.getElementById("options");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

const scoreText = document.getElementById("score");
const reviewDiv = document.getElementById("review");

let questions = [];
let currentQuestion = 0;
let answers = [];

/* -----------------------AI LOGIC----------------------------*/
function generateQuestions(text)
{
    const lines = text.split(".").filter(l => l.trim().length > 10);

    return lines.slice(0, 5).map((line, index ) => {
        return{
            type: index % 3 === 0 ? "MCQ" : index % 3 === 1 ? "TF" : "Short",
            question: "Explain:  "+line.trim(),
            options: ["True" , "False"],
            answer: index % 2 === 0 ? "True" : "False"
        };
    });
}

/*--------------------------------------------------------------*/ 
generateBtn.onclick = () => {
    if(!notesInput.value.trim())
    {
        alert("NOTES to daal de Bhai.");
        return;
    }

    questions = generateQuestions(notesInput.value);
    answers = new Array(questions.length).fill(null);

    inputSection.classList.add("hidden");
    resultSection.classList.remove("hidden");

    loadQuestion();
}

/*--------------------------------------------------------------*/ 
function loadQuestion()
{
    const q = questions[currentQuestion];
    questionTitle.innerText = `Q ${currentQuestion +1}.${q.question}`;
    optionsDiv.innerHTML ="";

    if(q.type === "MCQ" || q.type === "TF")
    {
        q.options.forEach(opt => {
            const div = document.createElement("div");
            div.className = "option";
            div.innerHTML = `
            <label>
                <input type="radio" name="option" value="${opt}"
                ${answers[currentQuestion] === opt ? "checked" : ""}>
                ${opt}
            </label>
            `;
            optionsDiv.appendChild(div);
        });
    }
    else
    {
        const input = document.createElement("input");
        input.type = "text";
        input.value = answers[currentQuestion] || "";
        input.oninput.appendChild(input);
    }

    prevBtn.disabled = currentQuestion === 0;
    nextBtn.classList.toggle("hidden", currentQuestion === questions.length - 1);
    submitBtn.classList.toggle("hidden", currentQuestion !== questions.length - 1);

}

/*-----------------------NAVIGATION-----------------------------*/
nextBtn.onclick = () => {
    saveAnswer();
    currentQuestion++;
    loadQuestion();
};

prevBtn.onclick = () => {
    saveAnswer();
    currentQuestion--;
    loadQuestion();
};

function saveAnswer()
{
    const selected = document.querySelector("input[name='option']:checked");
    if(selected) answers[currentQuestion] = selected.value;
}

/*---------------------------SUBMISSION-------------------------*/
submitBtn.click = () => {
    saveAnswer();
    quizSection.classList.add("hidden");
    resultSection.classList.remove("hidden");

    let score = 0;
    reviewDiv.innerHTML = "";

    questions.forEach((q,i) => {
        const correct = answers[i] === q.answer;
        if(correct) score++;

        const p = document.createElement("p");
        p.innerHTML = `
        Q${i+1}: ${correct ?
        `<span class="correct">Correct</span>` :
        `<span class="wrong">Wrong</span> (Correct: ${q.answer})`}
        `;
        reviewDiv.appendChild(p);
    });
    scoreText.innerText = `Score: ${score} / ${questions.length}`;
}