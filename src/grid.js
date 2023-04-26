class Grid{
  constructor(grid, rows, columns){
      this.grid = grid;
      this.rows = rows;
      this.columns = columns;
  }

  static createNewGrid(rows, columns, fillFunction){
    let grid = Array.from(
      { length: rows },
      () => Array.from(
          Array( columns ).fill(0), 
          fillFunction
        )
    );
    
    return new Grid(grid, rows, columns);
  }

  update(game){
    let grid = game.applyRules(this.grid);
    return new Grid(grid, this.rows, this.columns);
  }
}