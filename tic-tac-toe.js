var gridElement = document.getElementById('grid');
var dashboard = document.getElementById('dashboard');

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
    if(this.victory()) {
      this.renderGameOver(game.currentPlayer);
    } else if(this.full()) {
        this.renderGameOver(false);
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
  victory: function() {
    var g = this.grid
    var win1 = [g[0], g[1], g[2]];
    var win2 = [g[3], g[4], g[5]];
    var win3 = [g[6], g[7], g[8]];
    var win4 = [g[0], g[3], g[6]];
    var win5 = [g[1], g[4], g[7]];
    var win6 = [g[2], g[5], g[8]];
    var win7 = [g[0], g[4], g[8]];
    var win8 = [g[6], g[4], g[2]];

    if (this.hasSameSymbol(win1, game.currentPlayer)) { return true; }
    if (this.hasSameSymbol(win2, game.currentPlayer)) { return true; }
    if (this.hasSameSymbol(win3, game.currentPlayer)) { return true; }
    if (this.hasSameSymbol(win4, game.currentPlayer)) { return true; }
    if (this.hasSameSymbol(win5, game.currentPlayer)) { return true; }
    if (this.hasSameSymbol(win6, game.currentPlayer)) { return true; }
    if (this.hasSameSymbol(win7, game.currentPlayer)) { return true; }
    if (this.hasSameSymbol(win8, game.currentPlayer)) { return true; }
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
    dashboard.innerHTML = "";
    gridElement.innerHTML = "";
    gridElement.style.border = "none";
    var output = "Game Over! ";
    if(winner) {
      output += winner === game.player1 ?
          "Player 1 (" + game.player1.toUpperCase() + ")":
          "Player 2 (" + game.player2.toUpperCase() + ")";
      output += " wins!"
    } else {
      output += "It's a cat's game!";
    }
    var outputElement = document.createElement('p');
    var reload = document.createElement('a');
    outputElement.className = 'game-over';
    reload.className = 'reload';
    gridElement.appendChild(outputElement);
    outputElement.innerHTML = output;
    gridElement.appendChild(reload);
    reload.innerHTML = "Play Again";
    reload.setAttribute('href', 'index.html');
    dashboard.style.visibility = 'hidden';
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
    var output = 'Player: ' + this.currentPlayer.toUpperCase();
    dashboard.innerHTML = output;
  },
  choosePlayers: function() {
    var playerSymbols = ['x', 'o'];
    var randomNumber = Math.round(Math.random());
    this.player1 = playerSymbols.splice(randomNumber,1).toString();
    this.player2 = playerSymbols[0];
    this.currentPlayer = this.player1;
  },
  switchPlayers: function() {
    var player1 = this.player1;
    var player2 = this.player2;
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
        var id = event.target.id;
        var index = (id.charAt(id.length - 1) - 1);
        game.processTurn(index);
      }
    });
  }
}

game.run.call(game);
