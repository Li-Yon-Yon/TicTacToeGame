var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var player = 'X';
var ticktacktoe = [
    ' ', ' ', ' ',
    ' ', ' ', ' ',
    ' ', ' ', ' '
];
var defaultPlayer = function () {
    rl.question("Default player is X, Do you want to change it, y or n ", function (defaultOrChoose) {
        var choice = defaultOrChoose.toLowerCase();
        if (choice == 'y') {
            setPlayer();
        }
        else if (choice === 'n') {
            console.log("Starting player is X");
            printBoard();
            playTickTacToe();
        }
        else {
            defaultPlayer();
        }
    });
};
var setPlayer = function () {
    rl.question("Default player is X, Do you want to change it, enter O? ", function (whichPlayer) {
        changePlayer(whichPlayer);
    });
};
var changePlayer = function (playerChange) {
    var mov = playerChange.toUpperCase();
    if (mov === 'O' || mov === 'X') {
        console.log("Starting player is ".concat(mov));
        player = mov;
        printBoard();
        playTickTacToe();
    }
    else {
        setPlayer();
    }
};
var playTickTacToe = function () {
    var continePlay = false;
    for (i = 0; i < ticktacktoe.length; i++) {
        if (ticktacktoe[i] === ' ') {
            continePlay = true;
        }
    }
    if (continePlay === true) {
        rl.question("Play Game ? ", function (movve) {
            gameplayer(movve);
        });
    }
};
var gameplayer = function (move) {
    var moveToCheck = parseInt(move) - 1;
    var i;
    for (i = 0; i < ticktacktoe.length; i++) {
        if (moveToCheck == i && ticktacktoe[i] === ' ') {
            ticktacktoe[i] = player;
            if (player === 'X') {
                player = 'O';
            }
            else if (player === 'O') {
                player = 'X';
            }
        }
        else {
            playTickTacToe();
        }
    }
    console.log('\n');
    printBoard();
    var winner = calculateWinner();
    if (winner != ' ') {
        console.log("Winner is ".concat(winner));
        process.exit(0);
    }
    playTickTacToe();
};
var calculateWinner = function () {
    if (ticktacktoe[0] == ticktacktoe[1] && ticktacktoe[0] == ticktacktoe[2]) {
        return ticktacktoe[0];
    }
    else if (ticktacktoe[3] == ticktacktoe[4] && ticktacktoe[3] == ticktacktoe[5]) {
        return ticktacktoe[3];
    }
    else if (ticktacktoe[6] == ticktacktoe[7] && ticktacktoe[6] == ticktacktoe[8]) {
        return ticktacktoe[6];
    }
    else if (ticktacktoe[0] == ticktacktoe[3] && ticktacktoe[0] == ticktacktoe[6]) {
        return ticktacktoe[0];
    }
    else if (ticktacktoe[1] == ticktacktoe[4] && ticktacktoe[1] == ticktacktoe[7]) {
        return ticktacktoe[1];
    }
    else if (ticktacktoe[2] == ticktacktoe[5] && ticktacktoe[2] == ticktacktoe[8]) {
        return winner = ticktacktoe[2];
    }
    else if (ticktacktoe[0] == ticktacktoe[4] && ticktacktoe[0] == ticktacktoe[8]) {
        return ticktacktoe[0];
    }
    else if (ticktacktoe[2] == ticktacktoe[4] && ticktacktoe[2] == ticktacktoe[6]) {
        return ticktacktoe[2];
    }
    return ' ';
};
var printBoard = function () {
    var line = "";
    for (var i = 1; i < 10; i++) {
        line += ticktacktoe[i - 1] + ' | ';
        if (i % 3 === 0) {
            console.log(line);
            console.log('____________');
            line = "";
        }
    }
};
printBoard();
defaultPlayer();
