let array = []; // Initialize an empty array
let iterations = 0; // Count iterations

// Function to render the array in the UI
function renderArray() {
    const container = document.getElementById('array-container');
    container.innerHTML = ''; // Clear previous elements
    array.forEach((num, index) => {
        const box = document.createElement('div');
        box.className = 'number-box';
        box.textContent = num;
        box.id = `num-${index}`;
        container.appendChild(box);
    });
}

// Function to set the array from user input
function setArray() {
    const input = document.getElementById('array-input').value;
    const numArray = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));

    if (numArray.length === 0) {
        alert('Please enter a valid array of numbers.');
        return;
    }

    // Sort the array for binary search
    array = numArray.sort((a, b) => a - b);
    renderArray();
    document.getElementById('result').innerHTML = ''; // Clear previous results
}

// Function to generate a random sorted array
function generateRandomArray() {
    const randomNumbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    array = randomNumbers.sort((a, b) => a - b);
    renderArray();
    document.getElementById('result').innerHTML = ''; // Clear previous results
}

// Function to start the binary search
function startSearch() {
    const searchValue = parseInt(document.getElementById('search-value').value);
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous results
    iterations = 0;

    if (isNaN(searchValue)) {
        alert('Please enter a valid number');
        return;
    }

    // Call binary search function and display result
    const index = binarySearch(array, searchValue);
    if (index !== -1) {
        resultDiv.innerHTML = `Element found at index ${index}<br>Iterations: ${iterations}`;
    } else {
        resultDiv.innerHTML = `Element not found<br>Iterations: ${iterations}`;
    }
}

// Function for the binary search algorithm
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    // Clear any previous highlights
    array.forEach((_, index) => {
        document.getElementById(`num-${index}`).classList.remove('active', 'found');
    });

    // Start binary search
    while (left <= right) {
        iterations++;
        const mid = Math.floor((left + right) / 2);

        // Highlight the current mid element
        document.getElementById(`num-${mid}`).classList.add('active');

        if (arr[mid] === target) {
            // Mark the found element and return index
            document.getElementById(`num-${mid}`).classList.add('found');
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1; // Move to the right half
        } else {
            right = mid - 1; // Move to the left half
        }

        // Remove highlight from mid after a delay
        setTimeout(() => {
            document.getElementById(`num-${mid}`).classList.remove('active');
        }, 500);
    }

    return -1; // Element not found
}

// Initial render to set up the empty state
renderArray();
