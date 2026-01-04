let students = [
    { name: "Alice", score: 85 },
    { name: "Bob", score: 92 },
    { name: "Charlie", score: 80 },
    { name: "David", score: 75 },
    { name: "Eva", score: 96 }
];

const tableBody = document.getElementById("student-table");
const searchInput = document.getElementById("search-input");
const sortingBtn = document.getElementById("sorting-btn");
const addBtn = document.getElementById("add-btn");
const nameInput = document.getElementById("name-input");
const scoreInput = document.getElementById("score-input");

function renderTable(list) {
    tableBody.innerHTML = "";

    if (list.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="3" class="no-data">No Students Found</td>`;
        tableBody.appendChild(row);
        return;
    }

    list.forEach((student, index) => {
        const row = document.createElement("tr");

        const rankTd = document.createElement("td");
        rankTd.textContent = index + 1;

        const nameTd = document.createElement("td");
        nameTd.textContent = student.name;

        const scoreTd = document.createElement("td");
        scoreTd.textContent = student.score;

        row.append(rankTd, nameTd, scoreTd);
        tableBody.appendChild(row);
    });
}

function applyFilter() {
    const query = searchInput.value.toLowerCase();
    const filtered = students.filter(s =>
        s.name.toLowerCase().includes(query)
    );
    renderTable(filtered);
}

sortingBtn.addEventListener("click", () => {
    students.sort((a, b) => b.score - a.score);
    applyFilter();
});

searchInput.addEventListener("input", applyFilter);

addBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const score = Number(scoreInput.value);

    if (!name || Number.isNaN(score)) {
        alert("Enter valid name and score");
        return;
    }

    students.push({ name, score });

    nameInput.value = "";
    scoreInput.value = "";

    students.sort((a, b) => b.score - a.score);
    applyFilter();
});

renderTable(students);