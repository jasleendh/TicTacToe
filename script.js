/*
* Tic Tac Toe scripts, January 2017
* Version 2
* Jasleen Dhillon
*/

// select td all elements
var board = document.getElementsByTagName("td");

// assuming we index the 9 tic tac toe cells from left to right, top to
// bottom, as 0-8, these would be all of the winning combinations:
var winSets = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

// X always gets to go first
var player = "X";

// keep track of how many cells are empty at any time
var empty = 9;

// keep track of game status - false if still playing
var gameOver = false;

/* Function resetGame() is called when user clicks on the "game reset" button
 1. sets content of all 9 cells to nothing
 2. sets the starting player (this version, X always starts the game)
 3. updates the message to the current player
 4. resets the number of empty cells to 9
 5. sets the game over flag to false to indicate that the game is in progress
 */
function resetGame() {

    // This sets all the cells to nothing
    for (i = 0; i < board.length; i++) {
        board[i].innerHTML = "";
    }

    /* reset the player back to X and update it on the page as game always start with player X */
    player = "X";
    document.getElementById("player").innerText = player;

    /* reset gameOver and # of empty cells as when game is reset all cells are empty */
    gameOver = false;
    empty = 9;
}

/* Function cellClicked() is called
 when the event listeners for the "td" cells fire which occurs
 when the user clicks on one of the nine cells of the board
 1. decreases # of empty cells by 1
 2. sets the content of the clicked cell to the current player's mark
 3. checks whether or not there is a winner
 4. flips (changes) the current player
 5. updates the message to the current player
 */
function cellClicked(cell) {
    if (gameOver == false && cell.innerText == "") {
        // decrease # of empty cells by 1
        empty--;

        /* set content according to players mark and changes current player. In the end tells weather there is a winner or not */
        cell.innerHTML = player;
        checkWin();
        player = (player === "X") ? "O" : "X";
        document.getElementById("player").innerHTML = player;
    }
}

/* Function checkWin() is called to check all winning combinations and display results
 */
function checkWin() {

    var result = document.getElementById('winner');

    // TODO: document all of the code from class
    // Check and display the winner
    for (i = 0; i < winSets.length; i++) {
        if (board[winSets[i][0]].innerHTML == board[winSets[i][1]].innerHTML
            && board[winSets[i][1]].innerHTML == board[winSets[i][2]].innerHTML
            && board[winSets[i][0]].innerHTML != "") {

            // display the player who wins
            gameOver = true;
            result.innerText = player + " Wins";
            displayWin(true);
            break;
        }
    }

    // display that neither player wins and game is over now
    if (gameOver == false && empty == 0) {
        gameOver = true;
        result.innerText = "No one wins! :(";
        displayWin(true);
    }
}


document.getElementById("reset").addEventListener("click", resetGame);
document.getElementById("message").addEventListener("click", function () {
    displayWin(false);
});
for (i = 0; i < board.length; i++) {
    document.getElementsByTagName("td")[i].addEventListener("click", function () {
        cellClicked(this);
    });
}
// displays the results window with the winner inside it: the method will
// either show the results or hide them (displayWin(true) shows and
// displayWin(false) hides)
function displayWin(show) {
    if (show) {
        document.getElementById("message").style.display = "block";
        document.getElementById("overlay").style.display = "block";
    } else {
        document.getElementById("message").style.display = "none";
        document.getElementById("overlay").style.display = "none";
    }
}
