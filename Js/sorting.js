// Array and delay initialization
let array = [];
let delay = 100;

// Generate array from input
function generateArray() {
    const input = document.getElementById('array-input').value;
    array = input.split(',').map(Number);
    renderArray();
    document.getElementById('algorithm-description').innerText = '';
    document.getElementById('steps-table-body').innerHTML = '';
    document.getElementById('solution').innerText = '';
}

// Render array bars with numbers
function renderArray() {
    const arrayContainer = document.getElementById('array-container');
    arrayContainer.innerHTML = '';
    array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`; // Adjust the height multiplier to fit the container
        bar.innerText = value; // Display the number on the bar
        bar.style.textAlign = 'center'; // Center the number
        bar.style.color = '#fff'; // Make the text color white for better contrast
        arrayContainer.appendChild(bar);
    });
}

// Update step description and table
function updateStepDescription(step, description) {
    document.getElementById('step-description').innerText = description;

    const tableBody = document.getElementById('steps-table-body');
    const row = document.createElement('tr');
    const stepCell = document.createElement('td');
    const descCell = document.createElement('td');

    stepCell.innerText = step;
    descCell.innerText = description;

    row.appendChild(stepCell);
    row.appendChild(descCell);
    tableBody.appendChild(row);
}

// Bubble Sort Algorithm with steps
async function bubbleSort() {
    let n = array.length;
    let step = 1;
    updateStepDescription(step, 'Starting Bubble Sort...');
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                await swap(j, j + 1);
                updateStepDescription(step++, `Swapped elements at index ${j} and ${j + 1}`);
                renderArray();
                await sleep(delay);
            }
        }
    }
    updateStepDescription(step, 'Bubble Sort Complete.');
    document.getElementById('solution').innerText = array.join(', ');
}

// Selection Sort Algorithm with steps
async function selectionSort() {
    let n = array.length;
    let step = 1;
    updateStepDescription(step, 'Starting Selection Sort...');
    
    for (let i = 0; i < n; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            await swap(i, minIdx);
            updateStepDescription(step++, `Swapped elements at index ${i} and ${minIdx}`);
            renderArray();
            await sleep(delay);
        }
    }
    updateStepDescription(step, 'Selection Sort Complete.');
    document.getElementById('solution').innerText = array.join(', ');
}

// Insertion Sort Algorithm with steps
async function insertionSort() {
    let n = array.length;
    let step = 1;
    updateStepDescription(step++, 'Starting Insertion Sort...');

    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;

        updateStepDescription(step++, `Considering element at index ${i} (${key})`);

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j = j - 1;

            updateStepDescription(step++, `Shifting element at index ${j + 1} to index ${j + 2}`);
            renderArray();
            await sleep(delay);
        }
        array[j + 1] = key;

        updateStepDescription(step++, `Placed element ${key} at index ${j + 1}`);
        renderArray();
        await sleep(delay);
    }
    
    updateStepDescription(step++, 'Insertion Sort Complete.');
    document.getElementById('solution').innerText = array.join(', ');
}

// Swap elements
async function swap(i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    renderArray();
    await sleep(delay);
}

// Delay function for visualizing the sorting process
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
