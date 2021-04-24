let teamDB = [];
let id = 0;

//adds a team to the row and database
document.getElementById('addBtn').addEventListener('click', () => {
    let table = document.getElementById('myTable');
    let newTR = table.insertRow(1);
    newTR.insertCell(0).innerHTML = document.getElementById('newTeam').value;
    teamDB.push(document.getElementById('newTeam').value);
    document.getElementById('newTeam').value = '';
    console.log(teamDB);
});  

/*

Add to above is some way
    let addUpdate = row.insertCell(1)
    let addDelete = row.insertCell(2)
    addUpdate.appendChild(createUpdateField(id++));
    addDelete.appendChild(createDeleteButton(id++));


function createDeleteButton(id) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger';
    btn.id = id;
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let elementToDelete = document.getElementById(`teamItem-${id}`);
        elementToDelete.parentNode.removeChild(elementToDelete);
    }

function createUpdateField(id) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-success';
    btn.id = id;
    btn.innerHTML = 'Update';
    btn.onclick = () => {
        alert
    }
    }
    */
