var gridElement = document.getElementById('grid');
var dashgrid = document.getElementById('dashgrid');

var grid = {
  grid: [],
  init: function() {
    this.initializegrid();
    this.render();
  },
  initializegrid: function() {
    for(var i = 0; i < 9; i++) {
      this.grid[i] = 'blank';
      var newDiv = document.createElement('div');
      newDiv.id = "box" + (i + 1);
      gridElement.appendChild(newDiv);
    }
  },
  render: function() {
    var children = gridElement.children;
    for(var i = 0; i < children.length; i++) {
      children[i].className = grid.grid[i];
    }
  },
  checkForGameOver: function() {
    if(this.full()) {
      this.renderGameOver(false);
    } else if(this.diagonalVictory()
            || this.rowVictory()
            || this.columnVictory()) {
      this.renderGameOver(game.currentPlayer);
    } else {
      return false;
    }
  },
  full: function() {
    var full = true;
    for(var box in this.grid) {
      if(this.grid[box] === 'blank') {
        full = false;
      }
    }
    return full;
  },
  rowVictory: function() {
    let row1 = [this.grid[0], this.grid[1], this.grid[2]];
    let row2 = [this.grid[3], this.grid[4], this.grid[5]];
    let row3 = [this.grid[6], this.grid[7], this.grid[8]];
    if (this.hasSameSymbol(row1, game.currentPlayer)) { return true; }
    if (this.hasSameSymbol(row2, game.currentPlayer)) { return true; }
    if (this.hasSameSymbol(row3, game.currentPlayer)) { return true; }
    return false;
  },
  columnVictory: function() {
    let col1 = [this.grid[0], this.grid[3], this.grid[6]];
    let col2 = [this.grid[1], this.grid[4], this.grid[7]];
    let col3 = [this.grid[2], this.grid[5], this.grid[8]];
    if (this.hasSameSymbol(col1, game.currentPlayer)) { return true; }
    if (this.hasSameSymbol(col2, game.currentPlayer)) { return true; }
    if (this.hasSameSymbol(col3, game.currentPlayer)) { return true; }
    return false;
  },
  diagonalVictory: function() {
    let a1C3 = [this.grid[0], this.grid[4], this.grid[8]];
    let c1A3 = [this.grid[6], this.grid[4], this.grid[2]];
    if (this.hasSameSymbol(a1C3, game.currentPlayer)) { return true; }
    if (this.hasSameSymbol(c1A3, game.currentPlayer)) { return true; }
    return false;
  },
  hasSameSymbol: function(tripletArray, player) {
    if(tripletArray[0] === player
      && tripletArray[1] === player
      && tripletArray[2] === player) {
      return true;
    } else {
      return false;
    }
  },
  renderGameOver: function(winner) {
    dashgrid.innerHTML = "";
    gridElement.innerHTML = "";
    gridElement.style.border = "none";
    var output = "Game Over! ";
    if(winner) {
      output += winner === game.player1 ?
          "Player 1 (" + game.player1.toUpperCase() + ")":
          "Player 2 (" + game.player2.toUpperCase() + ")";
      output += " wins!"
    } else {
      output += "It's a tie!";
    }
    var outputElement = document.createElement('p');
    var reload = document.createElement('a');
    outputElement.className = 'game-over';
    reload.className = 'reload';
    gridElement.appendChild(outputElement);
    outputElement.innerHTML = output;
    gridElement.appendChild(reload);
    reload.innerHTML = "Play Again";
    reload.setAttribute('href', 'tic-tac-toe.html');
    dashgrid.style.visibility = 'hidden';
  }
}

var game = {
  currentPlayer: null,
  player1: null,
  player2: null,
  run: function() {
    this.choosePlayers();
    grid.init.call(grid);
    this.renderUpdate();
    this.listen();
  },
  renderUpdate: function() {
    let output = 'Current Player: ' + this.currentPlayer.toUpperCase();
    dashgrid.innerHTML = output;
  },
  choosePlayers: function() {
    let playerSymbols = ['x', 'o'];
    let randomNumber = Math.round(Math.random());
    this.player1 = playerSymbols.splice(randomNumber,1).toString();
    this.player2 = playerSymbols[0];
    this.currentPlayer = this.player1;
  },
  switchPlayers: function() {
    let player1 = this.player1;
    let player2 = this.player2;
    this.currentPlayer = this.currentPlayer === this.player1 ? player2 : player1;
  },
  processTurn: function(gridIndex) {
    grid.grid[gridIndex] = this.currentPlayer;
    grid.render.call(grid);
    grid.checkForGameOver.call(grid);
    this.switchPlayers();
    this.renderUpdate();
    this.listen();
  },
  listen: function() {
    gridElement.addEventListener('click', function(event) {
      if(event.target.classList.contains('blank')) {
        let id = event.target.id;
        let index = (id.charAt(id.length - 1) - 1);
        game.processTurn(index);
      }
    });
  }
}

game.run.call(game);
