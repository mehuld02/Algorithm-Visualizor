let array = [];
const container = document.getElementById("array-container");
const stepCounter = document.getElementById("step-counter");
const heapTreeContainer = document.getElementById("heap-tree-container");
let steps = 0;

// Function to generate a new random array
function generateArray() {
    array = [];
    container.innerHTML = '';
    heapTreeContainer.innerHTML = '';
    steps = 0;
    stepCounter.innerText = `Steps: ${steps}`;

    // Generate random array of 20 bars with random values
    for (let i = 0; i < 20; i++) {
        let value = Math.floor(Math.random() * 100) + 1;
        array.push(value);
    }

    displayArray(array);
}

// Function to display the array as bars
function displayArray(array) {
    container.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`;
        bar.innerText = value;
        container.appendChild(bar);
    });
}

// Function to update steps and visualize the current state
function updateSteps() {
    steps++;
    stepCounter.innerText = `Steps: ${steps}`;
    displayArray(array);
    visualizeHeapTree(array.length);
}

// Helper function to delay the process for visualization
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Heap Sort Algorithm
async function heapSort() {
    const n = array.length;

    // Build the heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
        updateSteps();
        await sleep(1000);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        [array[0], array[i]] = [array[i], array[0]]; // Swap
        updateSteps();
        await sleep(1000);

        await heapify(i, 0);
        updateSteps();
        await sleep(1000);
    }
}

// Heapify function for maintaining max heap
async function heapify(n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest != i) {
        [array[i], array[largest]] = [array[largest], array[i]]; // Swap
        updateSteps();
        await sleep(500);
        await heapify(n, largest);
    }
}

// Function to visualize the heap tree structure
function visualizeHeapTree(heapSize) {
    heapTreeContainer.innerHTML = ''; // Clear previous tree visualization

    const tree = document.createElement("div");
    tree.classList.add("heap-tree");

    const levels = Math.floor(Math.log2(heapSize)) + 1;

    for (let level = 0; level < levels; level++) {
        const levelDiv = document.createElement("div");
        levelDiv.classList.add("heap-level");

        const startIndex = Math.pow(2, level) - 1;
        const endIndex = Math.min(Math.pow(2, level + 1) - 1, heapSize);

        for (let i = startIndex; i < endIndex; i++) {
            const node = document.createElement("div");
            node.classList.add("heap-node");
            node.innerText = array[i];

            levelDiv.appendChild(node);

            if (i > startIndex) {
                const arrow = document.createElement("div");
                arrow.classList.add("arrow");
                arrow.innerHTML = "&#x2193;"; // Down arrow to show heap level relation
                levelDiv.appendChild(arrow);
            }
        }

        tree.appendChild(levelDiv);
    }

    heapTreeContainer.appendChild(tree);
}

// Initialize and generate a random array
generateArray();
