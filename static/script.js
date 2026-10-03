/**
 * Student Record Lookup System - Frontend JavaScript Logic
 * Handles API calls, dynamic UI updates, DAA trace visualizations, and comparisons.
 */

document.addEventListener('DOMContentLoaded', () => {
    fetchStats();
});

/**
 * Fetches dataset statistics from Flask API and updates UI.
 */
async function fetchStats() {
    try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        if (data.success) {
            document.getElementById('stat-records').textContent = data.total_students;
        }
    } catch (err) {
        console.error('Failed to load dataset statistics:', err);
    }
}

/**
 * Form submit handler for searching a student.
 */
function handleSearch(event) {
    if (event) event.preventDefault();
    const inputVal = document.getElementById('roll-input').value.trim();
    executeSearch(inputVal);
}

/**
 * Quick search button handler.
 */
function quickSearch(rollNo) {
    document.getElementById('roll-input').value = rollNo;
    executeSearch(rollNo);
}

/**
 * Main search execution logic.
 */
async function executeSearch(rollNo) {
    const errorAlert = document.getElementById('error-alert');
    const errorText = document.getElementById('error-text');
    const resultSection = document.getElementById('result-section');
    const traceSection = document.getElementById('trace-section');
    const comparisonResults = document.getElementById('comparison-results');

    // Reset error display
    errorAlert.style.display = 'none';

    // Data validation
    if (!rollNo) {
        showError('Please enter a student roll number.');
        return;
    }

    if (isNaN(rollNo) || !Number.isInteger(Number(rollNo))) {
        showError('Roll number must be a valid integer number.');
        return;
    }

    const rollInt = parseInt(rollNo, 10);
    if (rollInt < 0) {
        showError('Roll number cannot be negative.');
        return;
    }

    try {
        const response = await fetch(`/api/search?roll=${rollInt}`);
        const data = await response.json();

        if (!response.ok || !data.success) {
            showError(data.error || 'An error occurred while performing search.');
            return;
        }

        // Render Search Results Card
        renderSearchResult(data);

        // Render Binary Search Trace
        renderTrace(data.steps, data.comparisons);

        // Hide old comparison results until user explicitly clicks Compare
        comparisonResults.style.display = 'none';

    } catch (err) {
        console.error('Search request failed:', err);
        showError('Failed to connect to the backend server.');
    }
}

/**
 * Displays error message banner.
 */
function showError(msg) {
    const errorAlert = document.getElementById('error-alert');
    const errorText = document.getElementById('error-text');
    errorText.textContent = msg;
    errorAlert.style.display = 'block';

    document.getElementById('result-section').style.display = 'none';
    document.getElementById('trace-section').style.display = 'none';
}

/**
 * Renders student details card or Not Found state.
 */
function renderSearchResult(data) {
    const resultSection = document.getElementById('result-section');
    resultSection.style.display = 'block';

    if (data.found && data.student) {
        const s = data.student;
        resultSection.innerHTML = `
            <div class="result-card found">
                <div class="result-badge badge-found">
                    ✓ STUDENT FOUND
                </div>
                <div class="student-grid">
                    <div class="student-field">
                        <span class="field-label">ROLL NUMBER</span>
                        <span class="field-value mono">${s.roll_no}</span>
                    </div>
                    <div class="student-field">
                        <span class="field-label">STUDENT NAME</span>
                        <span class="field-value">${escapeHtml(s.name)}</span>
                    </div>
                    <div class="student-field">
                        <span class="field-label">BRANCH</span>
                        <span class="field-value">${escapeHtml(s.branch)}</span>
                    </div>
                    <div class="student-field">
                        <span class="field-label">YEAR</span>
                        <span class="field-value">${escapeHtml(s.year)}</span>
                    </div>
                    <div class="student-field">
                        <span class="field-label">EMAIL ADDRESS</span>
                        <span class="field-value">${escapeHtml(s.email)}</span>
                    </div>
                </div>
            </div>
        `;
    } else {
        resultSection.innerHTML = `
            <div class="result-card not-found">
                <div class="result-badge badge-not-found">
                    ✕ STUDENT NOT FOUND
                </div>
                <p style="color: var(--text-secondary); font-size: 0.95rem;">
                    No student record exists with the requested roll number in the dataset.
                </p>
            </div>
        `;
    }
}

/**
 * Renders the step-by-step Binary Search visualization trace.
 */
function renderTrace(steps, comparisons) {
    const traceSection = document.getElementById('trace-section');
    const stepsContainer = document.getElementById('steps-container');
    const comparisonBadge = document.getElementById('comparison-badge');

    traceSection.style.display = 'block';
    comparisonBadge.textContent = `${comparisons} comparison${comparisons === 1 ? '' : 's'}`;
    stepsContainer.innerHTML = '';

    steps.forEach(step => {
        const stepCard = document.createElement('div');
        const isFound = step.direction === 'found';
        stepCard.className = `step-card ${isFound ? 'step-found' : ''}`;

        let actionClass = 'action-left';
        if (step.direction === 'right') actionClass = 'action-right';
        if (isFound) actionClass = 'action-found';

        stepCard.innerHTML = `
            <div class="step-number">Step ${step.step}</div>
            <div class="step-pointers">
                <span>Low: <strong>${step.low}</strong></span>
                <span>Mid: <strong>${step.mid}</strong> (Roll: ${step.roll_no})</span>
                <span>High: <strong>${step.high}</strong></span>
            </div>
            <div class="step-comparison">
                ${escapeHtml(step.comparison)}
            </div>
            <div class="step-action ${actionClass}">
                → ${escapeHtml(step.action)}
            </div>
        `;

        stepsContainer.appendChild(stepCard);
    });
}

/**
 * Handles DAA algorithm comparison API call.
 */
async function handleCompare() {
    const inputVal = document.getElementById('roll-input').value.trim();

    if (!inputVal || isNaN(inputVal)) {
        showError('Please enter a valid roll number first to compare algorithm performance.');
        return;
    }

    const rollInt = parseInt(inputVal, 10);

    try {
        const response = await fetch(`/api/compare?roll=${rollInt}`);
        const data = await response.json();

        if (!response.ok || !data.success) {
            showError(data.error || 'Failed to perform algorithm comparison.');
            return;
        }

        document.getElementById('binary-count').textContent = data.binary_search.comparisons;
        document.getElementById('linear-count').textContent = data.linear_search.comparisons;

        const compResults = document.getElementById('comparison-results');
        compResults.style.display = 'grid';

    } catch (err) {
        console.error('Comparison request failed:', err);
        showError('Failed to connect to backend for comparison.');
    }
}

/**
 * XSS Prevention helper.
 */
function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
}
