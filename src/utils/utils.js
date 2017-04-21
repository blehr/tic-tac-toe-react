 var ttt = (function() {

    var player = "",
      computer = "",
      winArr = [
        ['sq1', 'sq2', 'sq3'],
        ['sq4', 'sq5', 'sq6'],
        ['sq7', 'sq8', 'sq9'],
        ['sq1', 'sq4', 'sq7'],
        ['sq2', 'sq5', 'sq8'],
        ['sq3', 'sq6', 'sq9'],
        ['sq1', 'sq5', 'sq9'],
        ['sq3', 'sq5', 'sq7']
      ],
      spacesArr = ['sq1', 'sq2', 'sq3', 'sq4', 'sq5', 'sq6', 'sq7', 'sq8', 'sq9'],
      cornerSpacesArr = ['sq1', 'sq3', 'sq7', 'sq9'],
      computerMarkArr = [],
      playerMarkArr = [],
      tempArr = [],
      playerTurn,
      mark,
      blockPos = "",
      beatPos = "",
      toe = '<img src="images/toes.png" class="ttt-img">',
      tick = '<img src="images/tick.jpg" class="ttt-img">';

    var showNotification = function showNotification() {
      var showDelay = setTimeout(function() {
        $('.ttt-notification').animate({
          top: "0"
        }, 500);
      }, 1000);
    };

    var hideNotification = function hideNotification() {
      $('.ttt-notification').animate({
        top: "-100%"
      }, 500);
    };

    var showVictory = function showVictory(winner) {
      playerTurn = 5;
      $('.ttt-notify-winner .ttt-text p').html(winner);
      $('.ttt-notify-winner').animate({
        top: "0"
      }, 500);
    };

    var hideResult = function hideResult() {
      $('.ttt-notify-winner .ttt-text p').html("");
      $('.ttt-notify-winner').animate({
        top: "-100%"
      }, 500);
    };

    var showTie = function showTie() {
      playerTurn = 5;
      $('.ttt-notify-winner .ttt-text p').html("Its a Tie!");
      $('.ttt-notify-winner').animate({
        top: "0"
      }, 500);
    };

    var usedSpaces = function usedSpaces(space) {
      spacesArr.splice(spacesArr.indexOf(space), 1);
      if (cornerSpacesArr.indexOf(space) !== -1) {
        cornerSpacesArr.splice(cornerSpacesArr.indexOf(space), 1);
      }
    };

    var blockPlayer = function blockPlayer() {
      winArr.forEach(function(win) {
        tempArr.length = 0;
        playerMarkArr.forEach(function(pos) {
          if (win.indexOf(pos) !== -1) {
            tempArr.push(pos);
            if (tempArr.length === 2) {
              win.forEach(function(winPos) {
                if (tempArr.indexOf(winPos) === -1) {
                  if (spacesArr.indexOf(winPos) !== -1) {
                    blockPos = winPos;
                    return true;
                  }
                }
              });
            }
          }
        });
      });
    };

    var beatPlayer = function beatPlayer() {
      winArr.forEach(function(win) {
        tempArr.length = 0;
        computerMarkArr.forEach(function(pos) {
          if (win.indexOf(pos) !== -1) {
            tempArr.push(pos);
            if (tempArr.length === 2) {
              win.forEach(function(winPos) {
                if (tempArr.indexOf(winPos) === -1) {
                  if (spacesArr.indexOf(winPos) !== -1) {
                    beatPos = winPos;
                    return true;
                  }
                }
              });
            }
          }
        });
      });
    };

    var randomChoice = function randomChoice(arr) {
      var markDelay = setTimeout(function() {
        beatPlayer();
        if (beatPos !== "") {
          mark = beatPos;
        } else {
          blockPlayer();
          if (blockPos !== "") {
            mark = blockPos;
          } else {
            var arrPos = Math.floor(Math.random() * (arr.length - 1 - 0 + 1)) + 0;
            mark = arr[arrPos];
          }
        }

        computerMarkArr.push(mark);
        usedSpaces(mark);
        checkForWin(computerMarkArr);
        playerTurn = 1;
        $("#" + mark).html(computer);

      }, 1200);
    };

    var playGame = function playGame() {
      if (playerTurn === 0) {
        if (spacesArr.length === 0) {
          showTie();
        } else {
          if (computerMarkArr.length < 3) {
            randomChoice(cornerSpacesArr);
          } else {
            randomChoice(spacesArr);
          }
        }
      }
    };

    var victory = function victory() {
      if (playerTurn === 1) {
        showVictory("You Win!");
      } else {
        showVictory("You Lose!");
      }
    };

    var checkForWin = function checkForWin(arr) {
      winArr.forEach(function(win) {
        if (arr.indexOf(win[0]) !== -1 && arr.indexOf(win[1]) !== -1 && arr.indexOf(win[2]) !== -1) {
          victory();
          return;
        }
      });
      if (playerTurn === 0 && spacesArr.length === 0) {
        showTie();
      } else {
        if (playerTurn === 1) {
          playerTurn = 0;
          playGame();
        }
      }
    };

    var playerTakesTurn = function() {
      if (playerTurn === 1) {
        var id = $(this).attr('id');
        if (spacesArr.indexOf(id) !== -1) {
          $(this).html(player);
          playerMarkArr.push(id);
          usedSpaces(id);
          checkForWin(playerMarkArr);
          blockPos = "";
          beatPos = "";
        } else {
          playerTurn = 1;
        }
      }
    };

    var playerChooseMark = function() {
      player = $(this).data('img');
      if (player === 'tick') {
        player = tick;
        computer = toe;
      } else {
        player = toe;
        computer = tick;
      }
      hideNotification();
      playerTurn = 0;
      computerMarkArr.length = 0;
      playerMarkArr.length = 0;
      playGame();
    };

    var reset = function() {
      $('.square').html("");
      spacesArr.length = 0;
      cornerSpacesArr.length = 0;
      spacesArr = ['sq1', 'sq2', 'sq3', 'sq4', 'sq5', 'sq6', 'sq7', 'sq8', 'sq9'];
      cornerSpacesArr = ['sq1', 'sq3', 'sq7', 'sq9'];
      blockPos = "";
      beatPos = "";
      computerMarkArr.length = 0;
      playerMarkArr.length = 0;
      playerTurn = 0;
      hideResult();
      playGame();
    };

    return {
      showNotification: showNotification,
      playerTakesTurn: playerTakesTurn,
      playerChooseMark: playerChooseMark,
      reset: reset
    };

  })();

  $(function() {

    ttt.showNotification();

    $('.square').on('click', ttt.playerTakesTurn);

    $('.x, .o').on('click', ttt.playerChooseMark);

    $('.ttt-reset').on('click', ttt.reset);

  });