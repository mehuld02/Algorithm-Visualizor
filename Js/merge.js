let steps = []; // To store steps of the merge sort
let currentStep = 0; // Track the current step

function mergeSort(arr) {
    if (arr.length <= 1) {
        steps.push({ action: 'single', array: [...arr] }); // Save when it's a single element
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Save the state before merging
    steps.push({ action: 'merge', left: [...left], right: [...right] });

    // Merging the two halves
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // Collect remaining elements from the left half, if any
    while (leftIndex < left.length) {
        result.push(left[leftIndex]);
        leftIndex++;
    }

    // Collect remaining elements from the right half, if any
    while (rightIndex < right.length) {
        result.push(right[rightIndex]);
        rightIndex++;
    }

    // Save the merged state after completing the merge
    steps.push({ action: 'result', merged: [...result] });
    return result;
}

async function startMergeSort() {
    const input = document.getElementById('arrayInput').value;
    const array = input.split(',').map(num => parseInt(num.trim(), 10));
    steps = []; // Reset steps
    mergeSort(array);
    currentStep = 0; // Reset the current step
    displayStep(); // Display the first step
    document.getElementById('result').innerText = `Sorted Array: ${steps[steps.length - 1].merged.join(', ')}`;
    document.getElementById('nextButton').style.display = 'block'; // Show the next button
}

function displayStep() {
    const visualizationDiv = document.getElementById('visualization');
    visualizationDiv.innerHTML = ''; // Clear previous visualizations

    if (currentStep < steps.length) {
        const step = steps[currentStep];

        const stepLabel = document.createElement('h3');
        stepLabel.innerText = `Step ${currentStep + 1}`;
        visualizationDiv.appendChild(stepLabel);

        const treeNode = document.createElement('div');
        treeNode.classList.add('tree-node');

        if (step.action === 'merge') {
            // Display the nodes being merged
            step.left.forEach(value => {
                const node = document.createElement('div');
                node.classList.add('node');
                node.innerText = value;
                treeNode.appendChild(node);
            });

            // Add line to separate left and right
            const line = document.createElement('div');
            line.classList.add('line');
            treeNode.appendChild(line);

            step.right.forEach(value => {
                const node = document.createElement('div');
                node.classList.add('node');
                node.innerText = value;
                treeNode.appendChild(node);
            });
        } else if (step.action === 'result') {
            // Display the result of the merge
            step.merged.forEach(value => {
                const node = document.createElement('div');
                node.classList.add('node');
                node.innerText = value;
                treeNode.appendChild(node);
            });
        } else if (step.action === 'single') {
            // Display single element step
            step.array.forEach(value => {
                const node = document.createElement('div');
                node.classList.add('node');
                node.innerText = value;
                treeNode.appendChild(node);
            });
        }

        visualizationDiv.appendChild(treeNode);
    }

    currentStep++;
}

function nextStep() {
    displayStep();
    // Hide button if all steps are displayed
    if (currentStep >= steps.length) {
        document.getElementById('nextButton').style.display = 'none';
    }
}
