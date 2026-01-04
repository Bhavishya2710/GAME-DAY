let students =[
    {name:"Alice", score:85},
    {name:"Bob", score:92},
    {name:"Charlie", score:80},
    {name:"David", score:75},
    {name:"Eva", score:96}
]

const table = document.getElementById("student-table");
const searchInput = document.getElementById("search-input");
const sortbtn = document.getElementById("sorting-btn");
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
}