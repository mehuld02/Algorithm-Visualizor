let grid = [];
const rows = 20;
const cols = 20;
let stepCount = 0; // Counter for steps

function generateMaze() {
    stepCount = 0;
    updateStepCounter();
    grid = Array.from({ length: rows }, () => Array(cols).fill(0));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = Math.random() < 0.3 ? 1 : 0; // 30% chance of being a wall
        }
    }
    grid[0][0] = 0; // Start point
    grid[rows - 1][cols - 1] = 0; // End point
    drawGrid();
}

function drawGrid() {
    const container = document.getElementById('grid-container');
    container.innerHTML = '';
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('grid-cell');
            if (cell === 1) {
                cellDiv.classList.add('wall');
            } else if (rowIndex === 0 && colIndex === 0) {
                cellDiv.classList.add('start');
            } else if (rowIndex === rows - 1 && colIndex === cols - 1) {
                cellDiv.classList.add('end');
            } else if (cell === 2) {
                cellDiv.classList.add('visited');
            } else if (cell === 4) {
                cellDiv.classList.add('shortest-path');
            }
            container.appendChild(cellDiv);
        });
    });
}

function updateStepCounter() {
    const stepCounter = document.getElementById('step-counter');
    stepCounter.textContent = `Steps: ${stepCount}`;
}

async function bfs() {
    const queue = [{ row: 0, col: 0, path: [] }];
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    visited[0][0] = true;

    while (queue.length > 0) {
        const { row, col, path } = queue.shift();
        if (row === rows - 1 && col === cols - 1) {
            alert("Path found!");
            drawPath(path.concat({ row, col }));
            return;
        }
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && grid[newRow][newCol] === 0 && !visited[newRow][newCol]) {
                visited[newRow][newCol] = true;
                grid[newRow][newCol] = 2; // Mark as visited
                queue.push({ row: newRow, col: newCol, path: path.concat({ row, col }) });
                stepCount++;
                updateStepCounter();
                drawGrid();
                await sleep(50);
            }
        }
    }
    alert("No path found!");
}

async function dfs() {
    const stack = [{ row: 0, col: 0, path: [] }];
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    visited[0][0] = true;

    while (stack.length > 0) {
        const { row, col, path } = stack.pop();
        if (row === rows - 1 && col === cols - 1) {
            alert("Path found!");
            drawPath(path.concat({ row, col }));
            return;
        }
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && grid[newRow][newCol] === 0 && !visited[newRow][newCol]) {
                visited[newRow][newCol] = true;
                grid[newRow][newCol] = 2; // Mark as visited
                stack.push({ row: newRow, col: newCol, path: path.concat({ row, col }) });
                stepCount++;
                updateStepCounter();
                drawGrid();
                await sleep(50);
            }
        }
    }
    alert("No path found!");
}

function drawPath(path) {
    path.forEach(({ row, col }) => {
        grid[row][col] = 4; // Mark as part of the shortest path
    });
    drawGrid();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.onload = generateMaze;
