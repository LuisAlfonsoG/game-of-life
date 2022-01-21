let grid = document.getElementById('grid');
let gridUpdated = document.getElementById('gridUpdated');
let play = document.getElementById('Play');
let randomButton = document.getElementById('random-button');

//Empty grid will be filled with 1 & 0 for mantaining the state of the grid
let Grid = [];

const squareSize = 30;

//Calc the number of rows and columns
const numOfRows = Math.round(window.innerHeight / 30) - 6;
const numOfColumns = Math.round(window.innerWidth /30);

//Filling the rows with 0's
for(let i = 0; i < numOfRows; i++){
    let row = [];
    for(let j = 0; j < numOfColumns; j++){
        row.push(0);
    }
    Grid.push(row);
}

//Function for generate a random grid of 0's and 1's
function generateRandom(){
    
    let newRandomGrid = [];
    for(let i = 0; i < numOfRows; i++){
        let row = [];
        for(let j = 0; j < numOfColumns; j++){
            row.push((Math.random() > 0.5) ? 1 : 0);
        }
        newRandomGrid.push(row);
    }
    return newRandomGrid;
}


randomButton.addEventListener('click', e => {
    renderGrid(grid, generateRandom(), numOfRows, numOfColumns);
});

/* Function for displaying the grid. 
    gridContainer: the dom element that will display the grid of cells
    arrayGrid: the array of 0's and 1's
    numOfRows: number of rows
    numOfColumns: number of columns
*/
function renderGrid(gridContainer, arrayGrid, numOfRows, numOfColumns){

    while(gridContainer.hasChildNodes()){
        let r = gridContainer.firstChild;
        r.remove();        
    }

    for(let i = 0; i < numOfRows; i++){
        let row = arrayGrid[i];
        let Row = document.createElement('div');
        Row.className = 'Row';
        
        for(let j = 0; j < numOfColumns; j++){
    
            let square = document.createElement('div');
            square.className = 'Square';
            square.textContent = row[j];
            if(square.textContent == '1') square.classList.add('On');
            Row.appendChild(square);
        }
    
        gridContainer.appendChild(Row);
    }
}

renderGrid(grid, Grid, numOfRows, numOfColumns);



//event listener for coloring the grid

grid.addEventListener('mousedown', e => {
    if(e.target.textContent === '0'){
        e.target.textContent = '1'
        e.target.classList.add('On');
    }
    else if(e.target.textContent === '1') {
        e.target.textContent = '0';
        e.target.classList.remove('On');
    }
    e.preventDefault();
    grid.addEventListener('mousemove', moved);
});

function moved(event){
    if(event.buttons == 0){ 
        grid.removeEventListener('mousemove', moved);
    } else{
        event.target.textContent = '1';
        event.target.classList.add('On');
    }
    
}

/*
    Fun Starts here
*/

let interval;
play.addEventListener('click', e => {

    if(e.target.textContent === 'Play'){
        e.target.textContent = 'Stop';
       
        interval = setInterval(playGame, 200);
    } else {
        e.target.textContent = 'Play';
        clearInterval(interval);
    }

    function playGame(){
        let current = readCurrentGrid(grid);
        renderGrid(grid, uptdateGrid(current), numOfRows, numOfColumns);
    }

});

//function for reading the current state of the dom grid and save it into an array;
function readCurrentGrid(container){
    let children = container.children;
    
    let userGrid = []
    for(let row of children ){
        let squares = row.children;
        let userRow = [];
        for(let square of squares){
            userRow.push((square.textContent === '0')? 0 : 1);
        }
        userGrid.push(userRow);
    }
    
    return userGrid;
}

//here we apply the rules of the game to the current game
function uptdateGrid(currentGrid){
    let newGrid = [];
    let aliveNeighbors = aliveGrid(currentGrid);

    for(let i = 0; i < numOfRows; i++){
        let newRow = aliveNeighbors[i];
        for(let j  = 0; j < numOfColumns; j++){
            if(newRow[j] === 3) newRow[j] = 1;
            else if(newRow[j] === 2 && currentGrid[i][j] === 1) newRow[j] = 1;
            else newRow[j] = 0; 
        }
        newGrid.push(newRow);
    }
    return newGrid;
}

//save the number of alive neighbors in a array
function aliveGrid(arr){
    let alive = [];

    for (let i = 0; i  < arr.length; i++) {
        let newRow = [];
        for (let j = 0; j < arr[i].length; j++) {
           newRow.push(countNeighbors(arr, i, j));     
        }
        alive.push(newRow);
        
    }

    return alive;
}

//count the number of alive neighbors a single cell
function countNeighbors(array, a, b){
    let number = 0;
    let coordinates = [[-1,-1],[-1,0],[-1,1], // Upper-Row
                        [0,-1],       [0,1],  // Current-Row
                        [1,-1],[1,0], [1,1]];  // Down-Row

    for(let coor of coordinates){
        let [x, y] = coor;
        x = x + a;
        y = y + b;
        number += (checkNeighbor(array, x, y) || 0);
    } 

    return number;

}

//simple checking to handle any Array out of bounds exception
function checkNeighbor(array, a, b){
    try { 
        return array[a][b];
    } catch {
        return 0;
    }
}