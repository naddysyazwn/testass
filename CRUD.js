const { app, BrowserWindow } = require('electron');
const fs = require('fs')
const path = require('path')


//BUTTON
var btnCreate = document.getElementById('btnCreate')
var btnRead = document.getElementById('btnRead')
var btnDelete = document.getElementById('btnDelete')
var btnUpdate = document.getElementById('btnUpdate')
var fileName = document.getElementById('fileName')
var fileContents = document.getElementById('fileContents')

let pathName = path.join(__dirname, 'Files')

//CREATE BUTTON
btnCreate.addEventListener('click', function(){ //creating text file when user click CREATE button
    let file = path.join(pathName, fileName.value)
    let contents = fileContents.value
    fs.writeFile(file, contents, function(err){ //param1: textfile yg kita nak write param2: apa yg kita nak write ke text file
        if(err){
            return console.log(err)
        }
        var txtfile = document.getElementById("fileName").value
        alert(txtfile + " text file has been add")
        console.log("Meal Plan has been add")
    })
})

//READ BUTTON
btnRead.addEventListener('click', function() {
    let file = path.join(pathName, fileName.value);

    fs.readFile(file, 'utf8', function(err, data) { 
        if (err) {
            console.error(err);
            return console.log(err);
        }
        fileContents.value = data;


        const lines = data.split('\n');


        const tableBody = document.getElementById('fileTableBody');
        tableBody.innerHTML = '';


        lines.forEach(function(line) {
            addContentToTable(line);
        });

        console.log("Meal planner has been Read!");
    });
});

//UPDATE BUTTON
btnUpdate.addEventListener('click', function () {
    let file = path.join(pathName, fileName.value);
    let contents = fileContents.value; 

    fs.writeFile(file, contents, function (err) { 
        if (err) {
            return console.log(err);
        }
        console.log("Meal planner was updated!")
        alert( "Meal planner was updated!")
        })
})

//DELETE BUTTON
btnDelete.addEventListener('click', function(){
    let file = path.join(pathName, fileName.value)
    
    fs.unlink(file, function(err){
        if(err){
            return console.log(err)
        }
        fileName.value = ""
        fileContents.value = ""
        console.log("Meal planner was deleted!")
    })
})


//TABLE
    function addContentToTable(content) {
        const newRow = document.createElement('tr');
    
        const contentCell = document.createElement('td');
        contentCell.textContent = content;
    
        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
    
        deleteButton.addEventListener('click', function() {

            const row = this.parentNode.parentNode; 
            const rowIndex = row.rowIndex;
            
            row.remove();
    
            const file = path.join(pathName, fileName.value);
            fs.readFile(file, 'utf8', function(err, data) {
                if (err) {
                    console.error(err);
                    return console.log(err);
                }
                const lines = data.split('\n');
                lines.splice(rowIndex - 1, 1); 
                const updatedData = lines.join('\n');
                fs.writeFile(file, updatedData, 'utf8', function(err) {
                    if (err) {
                        console.error(err);
                    }
                });
            });
        });
    
        deleteCell.appendChild(deleteButton);
    
        newRow.appendChild(contentCell);
        newRow.appendChild(deleteCell);
    
        const tableBody = document.getElementById('fileTableBody');
        tableBody.appendChild(newRow);
    }