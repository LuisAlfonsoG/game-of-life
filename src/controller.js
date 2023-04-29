class Controller{
  constructor(
    playButton, 
    randomGridButton,
    display,
    grid
  ){

    this.playButton = playButton;
    this.randomGridButton = randomGridButton;
    this.display = display;
    this.grid = grid;
    this.game = new Game();
    this.interval = 300;
    this.animationId;

    this.display.canvas.onpointerdown = (e) => this.changeGridState(e);
    this.display.canvas.addEventListener("touchmove", e => e.preventDefault());
    this.randomGridButton.onclick = () => this.generateRandomGrid();
    this.playButton.onclick = () => this.start();
    


    this.runGame = this.runGame.bind(this);
    this.stop = this.stop.bind(this);
  }

  changeGridState(event){

    this.stop();
    
    let pos = getGridCoordinates(
      this.display.canvas,
      {x: event.clientX, y: event.clientY},
      this.display.scale
    );

    this.grid.grid[pos.y][pos.x] = 
      this.grid.cellIsAlive(pos.y, pos.x) ? 0 : 1; 

    let move = (moveEvent) => {
      moveEvent.preventDefault();
      let newPos = getGridCoordinates(
        this.display.canvas, 
        {x: moveEvent.clientX, y: moveEvent.clientY}, 
        this.display.scale
      );
      
      if(newPos.x === pos.x && newPos.y === pos.y){
        return;
      }
      
      this.grid.grid[newPos.y][newPos.x] = 
        this.grid.cellIsAlive(newPos.y, newPos.x) ? 0 : 1;
      
      pos = newPos;  

      this.display.drawCurrentState(this.grid);
    }

    let end = () => {
      this.display.canvas.removeEventListener("pointermove", move);
      this.display.canvas.removeEventListener("pointerup", end);
    }

    this.display.canvas.addEventListener("pointermove", move);
    this.display.canvas.addEventListener("pointerup", end);

    this.display.drawCurrentState(this.grid);

  }

  generateRandomGrid(){
    this.grid = Grid.createNewGrid(
      this.grid.rows, 
      this.grid.columns, 
      () => Math.round(Math.random())
    );

    this.display.drawCurrentState(this.grid);
  }

  start(){
    this.playButton.innerText = "Stop";
    
    this.playButton.onclick = () => this.stop();
    
    this.runGame();
    
  }

  stop(){
    cancelAnimationFrame(this.animationId);
    this.playButton.innerText = "Play";
    this.playButton.onclick = () =>  this.start();
  }

  runGame(){
    let lastTime = null;
    
    let frame = time => {
      if(time - lastTime >= this.interval){
        lastTime = time;
        this.grid = this.grid.update(this.game);
        this.display.drawCurrentState(this.grid);
      }
      this.animationId = requestAnimationFrame(frame);
    }

    this.animationId = requestAnimationFrame(frame);
  }
}

function getGridCoordinates(canvas, pos, scale){
  let rect = canvas.getBoundingClientRect();
  return {
    x: Math.floor((pos.x - rect.x) / scale),
    y: Math.floor((pos.y - rect.y) / scale)
  }
}