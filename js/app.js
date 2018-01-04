document.addEventListener('DOMContentLoaded', function (){

  function GameOfLife(boardWidth, boardHeight) {
    this.width = boardWidth;
    this.height = boardHeight;
    this.board = document.querySelector('#board');
    this.cells = [];
  };

    GameOfLife.prototype.createBoard = function() {
    this.board.style.width = 10*this.width + 'px';
    this.board.style.height = 10*this.height + 'px';
    var allCells = this.width * this.height;

    for (var i = 0; i < allCells; i++) {
      var newDiv = document.createElement('div');
      newDiv.setAttribute('id', i)
      this.board.appendChild(newDiv);
      this.cells.push(newDiv);

    };

    // console.log('divki', this.cells[1000].style.left);

    this.cells.forEach(function(elem){
      elem.addEventListener('click', liveToggle);
    });

    function liveToggle (e){
      this.classList.toggle('live')
    };
    // console.log(allCells);
    // console.log(game.cells);
  };

  GameOfLife.prototype.position = function(x,y) {
    var index = x + y * this.width;
    return this.cells[index];
  };

  GameOfLife.prototype.setCellState = function(x,y, state) {
    if(this.position(x,y).classList.contains(state)){
      this.position(x,y).classList.remove(state);
    } else {
      this.position(x,y).classList.add(state);
    }
  };

  GameOfLife.prototype.firstGlider = function(x,y, state){
    this.setCellState(x,y,state);
    this.setCellState(x,y-1,state);
    this.setCellState(x+1,y,state);
    this.setCellState(x,y+1,state);
    this.setCellState(x-1,y-1,state);
  };

  GameOfLife.prototype.createNeighbors = function(x,y){
    var neighbors = [];

    if (x===0 && y === 0) {
     neighbors = [this.position(x+1, y),
     this.position(x, y+1), this.position(x+1, y+1)];
   } else if (x=== this.width-1 && y===0) {
     neighbors = [this.position(x-1, y), this.position(x-1, y+1),
      this.position(x, y+1),];
   } else if (x===this.width-1 && y === this.height-1) {
     neighbors = [this.position(x-1, y-1), this.position(x, y-1),
    this.position(x-1, y)];
  } else if (x === 0 && y === this.height-1) {
     neighbors = [this.position(x, y-1),
    this.position(x+1, y-1),this.position(x+1, y),];
  } else if (y===0 && x >0 || y===0 && x < this.width) {
     neighbors = [this.position(x-1, y),
     this.position(x+1, y), this.position(x-1, y+1),
     this.position(x, y+1), this.position(x+1, y+1)];
  } else if (x===0 && y > 0 || x===0 && y< this.height) {
     neighbors = [ this.position(x, y-1),this.position(x+1, y-1),
      this.position(x+1, y),this.position(x, y+1),
      this.position(x+1, y+1)];
  } else if (y === this.height -1 && x>0 || y=== this.height-1 && x < this.width) {
     neighbors = [this.position(x-1, y-1), this.position(x, y-1),
    this.position(x+1, y-1), this.position(x-1, y),
    this.position(x+1, y)];
  } else if (x===0 && y>0 || x===0 && y<this.height) {
    neighbors = [this.position(x, y-1),
   this.position(x+1, y-1), this.position(x+1, y),
   this.position(x, y+1), this.position(x+1, y+1)];
 } else {
   neighbors = [this.position(x-1, y-1), this.position(x, y-1),
  this.position(x+1, y-1), this.position(x-1, y),
  this.position(x+1, y), this.position(x-1, y+1),
  this.position(x, y+1), this.position(x+1, y+1)];
  }
  return neighbors;
 }


  GameOfLife.prototype.computeCellNextState = function(x,y){
    var liveNeighbor = [];
    var neighbors = this.createNeighbors(x,y);

    neighbors.forEach(function(elem){
      if(elem.classList.contains('live')) {
        liveNeighbor.push(elem);
      };
      return liveNeighbor;
    });
    console.log('zywiiii', liveNeighbor);
    if (this.position(x,y).classList.contains('live')&&liveNeighbor.length<2) {
      console.log('op 1 zerooooo');
      return 0;
    } else if (this.position(x,y).classList.contains('live')&&liveNeighbor.length===2 || this.position(x,y).classList.contains('live')&&liveNeighbor.length===3) {
      console.log('op2 jedeeeen');
        return 1;
      } else if (this.position(x,y).classList.contains('live')&&liveNeighbor.length>3) {
        console.log('op3 zerooooo');
        return 0;
    } else if ((!this.position(x,y).classList.contains('live'))&& liveNeighbor.length===3) {
      console.log('op4 jedeeeen');
      return 1;
    };
  };

  // GameOfLife.prototype.computeNextGeneration = function() {
  //   var nextGeneration = [];
  //   for (var y = 0; y < this.height; y++) {
  //     for (var x = 0; x < this.width; x++) {
  //       nextGeneration.push(this.computeCellNextState(x,y));
  //     }
  //   };
  //   console.log('next generationnnnn', nextGeneration);
  //   return nextGeneration;
  // }





  var game = new GameOfLife (20, 20, board);
  game.createBoard();
  game.createNeighbors(0,0);
  game.setCellState(5,5, 'live');
  game.firstGlider(1,1, 'live');
  game.computeCellNextState(0,0);
  // game.computeNextGeneration();
  console.log('position', game.position(1,1));








})
