class  Cell {
  constructor(row, col, board) {
      this.row = row;
      this.col = col;
      this.bomb = false;
      this.board = board;
      this.revealed = false;
      this.flagged = false;
  }

  getAdjCells() {
      var adj = [];
      var lastRow = board.length - 1;
      var lastCol = board[0].length - 1;
      if (this.row > 0 && this.col > 0) adj.push(board[this.row - 1][this.col - 1]);
      if (this.row > 0) adj.push(board[this.row - 1][this.col]);
      if (this.row > 0 && this.col < lastCol) adj.push(board[this.row - 1][this.col + 1]);
      if (this.col < lastCol) adj.push(board[this.row][this.col + 1]);
      if (this.row < lastRow && this.col < lastCol) adj.push(board[this.row + 1][this.col + 1]);
      if (this.row < lastRow) adj.push(board[this.row + 1][this.col]);
      if (this.row < lastRow && this.col > 0) adj.push(board[this.row + 1][this.col - 1]);
      if (this.col > 0) adj.push(board[this.row][this.col - 1]);       
      return adj;
  }

  calcAdjBombs() {
      var adjCells = this.getAdjCells();
      var adjBombs = adjCells.reduce(function(acc, cell) {
          return acc + (cell.bomb ? 1 : 0);
      }, 0);
      this.adjBombs = adjBombs;
  }

  flag() {
      if (!this.revealed) {
          this.flagged = !this.flagged;
          return this.flagged;
      }
  }

  reveal() {
      if (this.revealed && !hitBomb) return;
      this.revealed = true;
      if (this.bomb) return true;
      if (this.adjBombs === 0) {
          var adj = this.getAdjCells();
          adj.forEach(function(cell){
              if (!cell.revealed) cell.reveal();
          });
      }
      return false;
  }
}

let board = document.getElementById("table");
let size = 10;
let totalBombs = 20;
let board1 = buildArrays();





function whap() {
  board.innerHTML = "";
  for (let row = 0; row < size; row++) {
      let tr = document.createElement("tr");
      for (let col = 0; col < size; col++) {
          let td = document.createElement("td");
          td.className = "game-cell";
          td.setAttribute("data-row", row);
          td.setAttribute("data-col", col);
          td.innerText = "cell";
          tr.appendChild(td);
      }
      board.appendChild(tr);
  }
  document.getElementById("whar").innerText = "boom";
}

function buildCells(){
    board1.forEach(function(rowArr, rowIdx) {
      rowArr.forEach(function(slot, colIdx) {
        board1[rowIdx][colIdx] = new Cell(rowIdx, colIdx, board1);
      });
    });
    addBombs();
    runCodeForAllCells(function(cell){
      cell.calcAdjBombs();
    });
  };

function addBombs() {
  var currentTotalBombs = totalBombs;
  while (currentTotalBombs !== 0) {
    var row = Math.floor(Math.random() * size);
    var col = Math.floor(Math.random() * size);
    var currentCell = board1[row][col]
    if (!currentCell.bomb){
      currentCell.bomb = true
      currentTotalBombs -= 1
    }
  }
  document.getElementById("why").innerText = "boom";
};

function buildArrays() {
    var arr = Array(size).fill(null);
    arr = arr.map(function() {
      return new Array(size).fill(null);
    });
    return arr;
  };

  function runCodeForAllCells(cb) {
    board1.forEach(function(rowArr) {
      rowArr.forEach(function(cell) {
        cb(cell);
      });
    });
  }

  function check() {
    for (var row = 0; row<board1.length; row++) {
      for (var col = 0; col<board1[0].length; col++) {
        var cell = board1[row][col];
        if (!cell.bomb) {
          var td = document.querySelector(`[data-row="${cell.row}"][data-col="${cell.col}"]`);
        td.innerText = "not bomb";
        };
      }
    } 
    document.getElementById("woah").innerText = "boom";
  }