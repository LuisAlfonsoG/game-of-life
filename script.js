const canvas       = document.querySelector('canvas');
const play         = document.getElementById('Play');
const randomButton = document.getElementById('random-button');

const width  = canvas.parentElement.offsetWidth - 10;
const height = canvas.parentElement.offsetHeight - 10;

let maxLength = Math.max(width, height);

let SCALE   = Math.floor(maxLength / 25);
let COLUMNS = Math.floor(width / SCALE);
let ROWS    = Math.floor(height / SCALE);

canvas.width  = COLUMNS * SCALE;
canvas.height = ROWS * SCALE;

let display = new Display(canvas, SCALE, "cadetblue");
let grid = Grid.createNewGrid(ROWS, COLUMNS);

let controller = new Controller(play, randomButton, display, grid);

display.drawCurrentState(grid);

let game = new Game();
/*
grid.grid[5][5] = 1;
grid.grid[6][5] = 1;
grid.grid[7][5] = 1;

setInterval(() => {
    grid = grid.update(game);
    display.drawCurrentState(grid);
}, 1000)*/