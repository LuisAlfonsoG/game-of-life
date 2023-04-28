class Display{
  constructor(canvas, scale, color){
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.scale = scale;
    this.color = color;

    this.drawCurrentState = this.drawCurrentState.bind(this);
  }

  drawCurrentState(grid){
    let {width, height} = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
    this.drawSquares(grid);
    this.drawGrid(grid);
  }

  drawSquares( grid ){
    let {rows, columns} = grid;
    let {ctx, scale, color} = this;
    
    ctx.fillStyle = color;

    for(let i = 0; i < rows; i++){
      for(let j = 0; j < columns; j++){
        if(grid.grid[i][j]){
          ctx.fillRect(
            j * scale,
            i * scale,
            scale, scale
          )
        }
      }
    }
  }

  drawGrid(grid){
    let {rows, columns} = grid;
    let {ctx, scale} = this;

    ctx.strokeStyle = "rgba(0, 0,0,0.3)";

    for(let i = 0; i < rows; i++){
      for(let j = 0; j < columns; j++){
        ctx.strokeRect(
          j * scale,
          i * scale,
          scale, scale
        );
      }
    }
  }
}