const N = 8;
let board = new Array(N);

function createBoard(board) {

    for (let i = 0; i < board.length; i++) {

        board[i] = new Array(N);
    
        for (let j = 0; j < board[i].length; j++) {
    
            board[i][j] = 0;
        }
    }
}

function generateBlocks(rows, cols) {

    let body = document.querySelector("body");

    for (let i = 0; i < rows; i++) {

        for (let j = 0;  j < cols; j++) {
            
            let ele = document.createElement("div");

            ele.style.border = "solid 2px red";
            ele.style.width = "160px";
            ele.style.height = "50px";
            ele.style.textAlign = "center";
            ele.style.marginLeft = j * 160 + "px";
            ele.style.marginTop = i * 50 + "px";

            body.appendChild(ele);
        }
    }
}

function isAttackedSpace(board, row, col) {

    for (let i = 0; i < col; i++) 
    if (board[row][i] == 1) 
        return true; 

    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) 
        if (board[i][j] == 1) 
            return true; 

    for (let i = row, j = col; j >= 0 && i < N; i++, j--) 
        if (board[i][j] == 1) 
            return true; 

    return false; 
}

function solveChallange(board, col = 0) {

    if (col >= N) {

        return true;
    }

    for (let i = 0; i < N; i++) {

            if (!isAttackedSpace(board, i, col)) {
                board[i][col] = 1;
            

            if (solveChallange(board, col + 1)) {
                return true;
            }

            board[i][col] = 0;
        }
    }

    return false;
}

function outputSolution(board) {

    const tags = document.querySelectorAll("div");

    for (let i = 0; i < N; i++) {
    
        for (let j = 0; j < N; j++) {
    
            if (board[i][j] == 1) {
    
                let index = N * i + j;
    
                tags[index].innerText = 1;
            }
        }
    }
}

createBoard(board);
solveChallange(board);
generateBlocks(N, N);
outputSolution(board);