let display = document.getElementById('display');

// Operators
let clear = document.getElementById('clear');
let equal = document.getElementById('equal');

// History elements
let historyList = document.getElementById('history-list');

// Initialize result
let result = "";

// Load history from localStorage
window.onload = () => {
    loadHistory();
};

// Clear display and result
clear.addEventListener('click', () => {
    display.value = "";
    result = "";
});

// Insert number or operator
function insert(num) {
    result = display.value + num;
    display.value = result;
    return result;
}

// Evaluate result and add to history
equal.addEventListener('click', () => {
    try {
        let showResult = eval(result);
        display.value = showResult;
        addToHistory(result + " = " + showResult);
        result = showResult.toString();
    } catch (error) {
        display.value = "Error";
    }
});

// Add calculation to history and localStorage
function addToHistory(calculation) {
    let history = getHistory();
    history.push(calculation);
    localStorage.setItem('history', JSON.stringify(history));
    renderHistoryItem(calculation);
}

// Get history from localStorage
function getHistory() {
    let history = localStorage.getItem('history');
    return history ? JSON.parse(history) : [];
}

// Load and render history from localStorage
function loadHistory() {
    let history = getHistory();
    history.forEach(calculation => renderHistoryItem(calculation));
}

// Render a single history item
function renderHistoryItem(calculation) {
    let li = document.createElement('li');
    li.textContent = calculation;

    // Create delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener('click', () => {
        deleteHistoryItem(calculation);
        historyList.removeChild(li);
    });

    // Append delete button to list item
    li.appendChild(deleteBtn);

    // Add event listener for click to restore calculation
    li.addEventListener('click', () => {
        let expression = calculation.split(' = ')[0];
        display.value = expression;
        result = expression;
    });

    // Append list item to history list
    historyList.appendChild(li);
}

// Delete a specific history item from localStorage
function deleteHistoryItem(calculation) {
    let history = getHistory();
    let updatedHistory = history.filter(item => item !== calculation);
    localStorage.setItem('history', JSON.stringify(updatedHistory));
}
