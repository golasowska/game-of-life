document.addEventListener('DOMContentLoaded', function (){

  function GameOfLife() {
    this.width = prompt('Podaj szerokość planszy');
    this.height = prompt('Podaj wysokość planszy');
    this.board = document.querySelector('#board');
    this.cells = [];
  };

    GameOfLife.prototype.createBoard = function() {
    this.board.style.width = 20*this.width + 'px';
    this.board.style.height = 20*this.height + 'px';
    var allCells = this.width * this.height;

    for (var i = 0; i < allCells; i++) {
      var newDiv = document.createElement('div');
      newDiv.setAttribute('id', i)
      this.board.appendChild(newDiv);
      this.cells.push(newDiv);
    };

    this.cells.forEach(function(elem){
      elem.addEventListener('click', liveToggle);
    });

    function liveToggle (e){
      this.classList.toggle('live')
    };
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
   }
   else if (x=== this.width-1 && y===0) {
     neighbors = [this.position(x-1, y), this.position(x-1, y+1),
      this.position(x, y+1),];
   }
   else if (x===this.width-1 && y === this.height-1) {
     neighbors = [this.position(x-1, y-1), this.position(x, y-1),
    this.position(x-1, y)];
  }
  else if (x === 0 && y === this.height-1) {
     neighbors = [this.position(x, y-1),
    this.position(x+1, y-1),this.position(x+1, y),];
  }
  else if ((y===0 && x >0) && (y===0 && x < this.width)) {
     neighbors = [this.position(x-1, y),
     this.position(x+1, y), this.position(x-1, y+1),
     this.position(x, y+1), this.position(x+1, y+1)];
  }
  else if ((x===0 && y > 0) && (x===0 && y< this.height)) {
     neighbors = [ this.position(x, y-1),this.position(x+1, y-1),
      this.position(x+1, y),this.position(x, y+1),
      this.position(x+1, y+1)];
  }
  else if ((y === this.height -1 && x>0) && (y=== this.height-1 && x < this.width)) {
     neighbors = [this.position(x-1, y-1), this.position(x, y-1),
    this.position(x+1, y-1), this.position(x-1, y),
    this.position(x+1, y)];
  }
  else if ((x===this.width-1 && y>0) && (x===this.width-1 && y<this.height-1)) {
    neighbors = [this.position(x-1, y-1), this.position(x, y-1),
   this.position(x-1, y),this.position(x-1, y+1),
   this.position(x, y+1)];
 }
 else {
   neighbors = [this.position(x-1, y-1), this.position(x, y-1),
  this.position(x+1, y-1), this.position(x-1, y),
  this.position(x+1, y), this.position(x-1, y+1),
  this.position(x, y+1), this.position(x+1, y+1)];
  }
  return neighbors;
};


  GameOfLife.prototype.computeCellNextState = function(x,y){
    var liveNeighbor = [];
    var neighbors = this.createNeighbors(x,y);

    neighbors.forEach(function(elem){
      if(elem.classList.contains('live')) {
        liveNeighbor.push(elem);
      };
      return liveNeighbor;
    });
    if (this.position(x,y).classList.contains('live')&&liveNeighbor.length<2) {
      return 0;
    } else if (this.position(x,y).classList.contains('live')&&liveNeighbor.length===2 || this.position(x,y).classList.contains('live')&&liveNeighbor.length===3) {
        return 1;
      } else if (this.position(x,y).classList.contains('live')&&liveNeighbor.length>3) {
        return 0;
    } else if ((!this.position(x,y).classList.contains('live'))&& liveNeighbor.length===3) {
      return 1;
    } else {
      return 0;
    };
  };

  GameOfLife.prototype.computeNextGeneration = function() {
    var nextGeneration = [];
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        nextGeneration.push(this.computeCellNextState(x,y));
      }
    };
    return nextGeneration;
  };

  GameOfLife.prototype.printNextGeneration = function () {
    var states = this.computeNextGeneration();
    for (var i = 0; i < states.length; i++) {
      if (states[i]===1) {
          this.cells[i].classList.add('live');
      } else {
        this.cells[i].classList.remove('live');
      }
    }
    return this.cells
  };

  GameOfLife.prototype.startAnimation = function () {
    var self = this;
    var interval = setInterval(function(){
      self.printNextGeneration();
    }, 100);
    var pause = document.querySelector('#pause');
    pause.addEventListener('click', pauseAnimation);
    function pauseAnimation(e) {
      clearInterval(interval)
    };
  };

  GameOfLife.prototype.play = function() {
    var self = this;
    var butPlay = document.querySelector('#play');
    butPlay.addEventListener('click', startAnimation);
    function startAnimation(e) {
      self.startAnimation();
    };
  };

  var start = document.querySelector('#start');
  start.addEventListener('click', startGame);
  function startGame(){
    var game = new GameOfLife();
    game.createBoard();
    game.firstGlider(3,3, 'live');
    game.play();
    document.querySelector('#play').classList.remove('invisible');
    document.querySelector('#pause').classList.remove('invisible');
  }

})
