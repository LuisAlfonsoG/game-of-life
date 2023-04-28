class Game{
  constructor(
    minLive = 2,
    maxLive = 3,
    becomesAlive = 3
  ){
    this.minLive = minLive;
    this.maxLive = maxLive;
    this.becomesAlive = becomesAlive;
  
    this.applyRules = this.applyRules.bind(this);
    this.countAliveNeighbours = this.countAliveNeighbours.bind(this);
    this.countAliveNeighboursFromSquare = this.countAliveNeighboursFromSquare.bind(this); 
  }

  applyRules( grid ){
    let newGrid = this.countAliveNeighbours(grid);

    newGrid = newGrid.map((rows, y) => {
      let updateRow = rows.map((cell, x) => {
        if (grid[y][x] == 0 && cell == this.becomesAlive) {
          return 1;
        } else if (grid[y][x] == 1 && cell <= this.maxLive && cell >= this.minLive) {
          return 1;
        } else {
          return 0;
        }
      });
      return updateRow;
    });

    return newGrid;
  }

  countAliveNeighbours( grid ){
    let newGrid = grid.map((row, y) => {
      let newRow = row.map((cell, x) => 
        this.countAliveNeighboursFromSquare(x, y, grid)
      );
      return newRow;
    });

    return newGrid;
  }

  countAliveNeighboursFromSquare( x, y, grid ){
    let neighbours = [
      [-1, -1],[0, -1],[1, -1],
      [-1,  0],/*x,y*/ [1,  0],
      [-1,  1],[0,  1],[1,  1],
    ];

    let check = (x, y) => {
      try {
        return grid[y][x] || 0;
      } catch {
        return 0;
      }
    };

    let count = 0;
    for (let [a, b] of neighbours) {
      count += check(x + a, y + b);
    }

    return count;
  }

  setNewRules( minLive, maxLive, becomesAlive ){
    return new Game(minLive, maxLive, becomesAlive);
  }
}