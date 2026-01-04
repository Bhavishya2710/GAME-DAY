let students =[
    {name:"Alice", score:85},
    {name:"Bob", score:92},
    {name:"Charlie", score:80},
    {name:"David", score:75},
    {name:"Eva", score:96}
]

const table = document.getElementById("student-table");
const searchInput = document.getElementById("search-input");
const sortBtn = document.getElementById("sorting-btn");
const addBtn = document.getElementById("add-btn");
const nameInput = document.getElementById("name-input");
const scoreInput = document.getElementById("score-input");

function renderTable(data)
{
    table.innerHTML = "";

    if(data.length === 0)
    {
        table.innerHTML = `<tr><td colSpan="3" class="no-data">No Students Found</td></tr>`;
        return;
    }

    data.forEach((student,index)=>{
        const row = document.createElement("tr");
        true.innerHTML = `<td>${index +1}</td>
                          <td>${student.name}</td>
                          <td>${student.score}</td>`;
        table.appendChild(row);
    })
}

renderTable(students);

sortBtn.addEventListener("click",()=>{
    students.sort((a,b)=> b.score - a.score);
    applyFilter();
})

searchInput.addEventListener("input",applyFilter);

function applyFilter()
{
    const query = searchInput.value.toLowerCase();
    const filtered = students.filter(student => student.name.toLowerCase().includes(query));
    renderTable(filtered);
}

addBtn.addEventListener("click",()=>{
    const name = nameInput.value.trim();
    const score = Number(scoreInput.value);

    if(name === "" || isNaN(score))
    {
        alert("Enter valid name and score.");
        return;
    }

    students.push({name ,score});
    nameInput.value = "";
    scoreInput.value = "";

    students.sort((a,b) => b.score - a.score);
    applyFilter();
});