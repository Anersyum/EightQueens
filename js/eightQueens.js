let board;

function createBoard(board, N) {

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

            ele.style.border = "solid 2px #cc3333";
            ele.style.width = "160px";
            ele.style.height = "50px";
            ele.style.marginLeft = j * 160 + "px";
            ele.style.marginTop = i * 50 + "px";
            ele.className = "text-center";
            
            body.appendChild(ele);
        }
    }
}

function isAttackedSpace(board, row, col, N) {

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

function solveChallange(board, N, col = 0) {

    if (col >= N) {

        return true;
    }

    for (let i = 0; i < N; i++) {

            if (!isAttackedSpace(board, i, col, N)) {
                board[i][col] = 1;
            

            if (solveChallange(board, N, col + 1)) {
                return true;
            }

            board[i][col] = 0;
        }
    }

    return false;
}

function outputSolution(board, N) {

    const tags = document.querySelectorAll("div");

    for (let i = 0; i < N; i++) {
    
        for (let j = 0; j < N; j++) {
    
            if (board[i][j] == 1) {
    
                let index = N * i + j;
    
                tags[index].innerText = "Q";
            }
        }
    }
}

function removeField() {

    const fields = document.querySelectorAll("div");
    const text = document.querySelector("text");
    const body = document.querySelector("body");

    if (fields !== null)
        fields.forEach(element => {
            body.removeChild(element);
        });

    if (text !== null)
        body.removeChild(text);
}

function buttonPressed() {

    const N = parseInt(document.querySelector("input").value);

    if (!isNaN(N)) {

        board = new Array(N);
    
        removeField();
        createBoard(board, N);

        if (!solveChallange(board, N)) {

            let ele = document.createElement("text");
        
            ele.innerText = "Solution doesn't exist!";

            document.querySelector("body").appendChild(ele);
        }

        generateBlocks(N, N);
        outputSolution(board, N);
    }
    else {

        let ele = document.createElement("text");
        
            ele.innerText = "You must enter a number!";

            document.querySelector("body").appendChild(ele);
    }
}