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
      this.board.appendChild(newDiv);
      this.cells.push(newDiv);
    };

    this.cells.forEach(function(elem){
      elem.addEventListener('click', liveToggle);
    });

    function liveToggle (e){
      this.classList.toggle('live')
    };

    console.log(allCells);
    console.log(game.cells);
  };




  var game = new GameOfLife (50, 50, board);
  game.createBoard();








})
