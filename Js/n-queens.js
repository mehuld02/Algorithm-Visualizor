let n = 0;
let board = [];
let steps = [];

function createBoard(size) {
    board = Array.from({ length: size }, () => Array(size).fill(0));
    steps = []; // Reset steps
    drawBoard();
    updateSteps(); // Clear steps display
}

function drawBoard() {
    const container = document.getElementById('n-queens-board');
    container.innerHTML = '';
    board.forEach((row) => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('board-row');
        row.forEach((cell) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('board-cell');
            if (cell === 1) {
                cellDiv.classList.add('queen');
            }
            rowDiv.appendChild(cellDiv);
        });
        container.appendChild(rowDiv);
    });
}

function updateSteps() {
    const stepsDiv = document.getElementById('steps');
    stepsDiv.innerHTML = ''; // Clear previous steps
    steps.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.classList.add('step');
        stepDiv.innerText = `Step ${index + 1}: Placed queen at Row ${step.row + 1}, Column ${step.col + 1}`;
        stepsDiv.appendChild(stepDiv);
    });
}

function solveNQueens() {
    n = parseInt(document.getElementById('n-queens-size').value);
    if (n < 1 || n > 20) {
        alert('Please enter a value between 1 and 20.');
        return;
    }
    createBoard(n);
    if (solveNQUtil(0)) {
        drawBoard();
        updateSteps(); // Update steps after solution
    } else {
        alert('Solution does not exist');
    }
}

function isSafe(row, col) {
    // Check this row on left side
    for (let i = 0; i < col; i++) {
        if (board[row][i] === 1) {
            return false;
        }
    }
    // Check upper diagonal on left side
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) {
            return false;
        }
    }
    // Check lower diagonal on left side
    for (let i = row, j = col; j >= 0 && i < n; i++, j--) {
        if (board[i][j] === 1) {
            return false;
        }
    }
    return true;
}

function solveNQUtil(col) {
    if (col >= n) {
        return true; // All queens are placed
    }
    for (let i = 0; i < n; i++) {
        if (isSafe(i, col)) {
            board[i][col] = 1; // Place queen
            steps.push({ row: i, col: col }); // Record the step
            drawBoard(); // Draw current board state
            updateSteps(); // Update steps display

            if (solveNQUtil(col + 1)) {
                return true; // Recur to place next queen
            }
            board[i][col] = 0; // Backtrack
            steps.pop(); // Remove last step if backtracking
        }
    }
    return false;
}

window.onload = () => createBoard(8);
