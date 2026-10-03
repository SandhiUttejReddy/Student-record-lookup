# Student Record Lookup System Using Binary Search

> **Design and Analysis of Algorithms (DAA) Mini-Project**  
> Problem Statement #39 — Student Record Lookup  
> Core Concept: Iterative Binary Search vs Linear Search Visualization

---

## 1. Project Title & Problem Statement

**Title:** Student Record Lookup System Using Binary Search  
**Problem Statement #39:**  
*"A university maintains thousands of student records identified by unique roll numbers. The system needs to determine whether a roll number exists and retrieve the student's information efficiently."*

---

## 2. Objective

The objective of this web application is to demonstrate how **Binary Search** efficiently searches student records stored in a sorted dataset compared to a sequential **Linear Search**. 

Rather than functioning purely as a CRUD application, this system focuses on **DAA algorithm visualization**, tracking:
- Step-by-step pointers (`low`, `mid`, `high`)
- Number of comparisons
- Execution trace for both successful searches and "Not Found" scenarios
- Empirical comparison between $O(\log n)$ Binary Search and $O(n)$ Linear Search

---

## 3. Features

- ⚡ **Iterative Binary Search Engine:** Fast lookup on sorted student records.
- 📊 **Step-by-Step Visualization Trace:** Displays every comparison, mid-point calculation, and search window division.
- ⚔️ **DAA Algorithm Comparison:** Real-time side-by-side comparison of comparison counts between Linear Search and Binary Search.
- 🎨 **Modern Dark Technical Dashboard:** Clean, responsive UI with glowing status indicators, statistics cards, and quick-search presets.
- 🛡️ **Data Validation & Error Handling:** Gracefully handles invalid inputs, non-numeric strings, negative numbers, and missing records.

---

## 4. Technology Stack

- **Frontend:** HTML5, CSS3 (Custom Vanilla CSS design system), Vanilla JavaScript (ES6 fetch API)
- **Backend:** Python 3, Flask REST API
- **Data Source:** `students.json` (50 student records with unique roll numbers from 101 to 150)
- **Algorithms:** Binary Search ($O(\log n)$), Linear Search ($O(n)$)

---

## 5. Project Architecture

```
USER
  │
  ▼
HTML/CSS/JavaScript Frontend (Dashboard & Visualization)
  │
  ▼
Flask Backend (REST API Server - app.py)
  │
  ├───────────────────────────────┐
  ▼                               ▼
Student Data (data/students.json)  Search Algorithms (algorithms/)
  │                               ├── binary_search.py (Iterative O(log n))
  ▼                               └── linear_search.py (O(n))
Sorted Dataset
  │
  ▼
Search Result & Execution Trace JSON Response
  │
  ▼
UI Rendering (Trace Cards & Comparison Grid)
```

---

## 6. Directory Structure

```
student-record-lookup/
├── app.py                      # Flask REST API backend & static route server
├── requirements.txt            # Python dependencies (Flask)
├── README.md                   # Complete DAA documentation & viva guide
├── data/
│   └── students.json           # 50 student records (Roll numbers 101–150)
├── algorithms/
│   ├── __init__.py             # Algorithms package initializer
│   ├── binary_search.py        # Iterative Binary Search with step tracing
│   └── linear_search.py        # Linear Search for empirical DAA comparison
├── templates/
│   └── index.html              # Modern dashboard template
└── static/
    ├── style.css               # Vanilla CSS design system (Dark mode)
    └── script.js               # Frontend fetch logic & trace rendering
```

---

## 7. How Binary Search Works

Binary Search is a divide-and-conquer algorithm that locates an element in a **sorted array** by repeatedly dividing the search interval in half:

1. Maintain two pointers: `low` (start of window) and `high` (end of window).
2. Calculate the middle index: $\text{mid} = \lfloor \frac{\text{low} + \text{high}}{2} \rfloor$.
3. Compare `students[mid].roll_no` with `target_roll`:
   - If equal: **Target Found**. Return student record and trace.
   - If `target_roll < students[mid].roll_no`: Target lies in the **left half**. Update `high = mid - 1`.
   - If `target_roll > students[mid].roll_no`: Target lies in the **right half**. Update `low = mid + 1`.
4. Repeat steps until target is found or `low > high` (Target Not Found).

### DAA Pseudocode

```text
BinarySearch(A, target)
    low = 0
    high = n - 1
    
    while low <= high:
        mid = (low + high) / 2
        if A[mid].roll_no == target:
            return FOUND, A[mid]
        else if A[mid].roll_no > target:
            high = mid - 1
        else:
            low = mid + 1
            
    return NOT FOUND
```

---

## 8. Complexity Analysis

| Algorithm | Best Case Time | Average Case Time | Worst Case Time | Space Complexity | Prerequisite |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Binary Search** | $O(1)$ | $O(\log n)$ | $O(\log n)$ | $O(1)$ (Iterative) | Data MUST be sorted |
| **Linear Search** | $O(1)$ | $O(n)$ | $O(n)$ | $O(1)$ | No sorting required |

### Important Sorting Detail

Binary Search **requires** ordered data. In `app.py`, records are sorted on application startup:
```python
students.sort(key=lambda student: student["roll_no"])
```

> **Viva Note:** If data is already maintained in sorted order, each lookup takes $O(\log n)$. If the dataset is initially unsorted, sorting it using Python's built-in Timsort takes $O(n \log n)$ time.

---

## 9. Installation & Local Setup

### Step 1: Clone / Open Project Folder
Navigate to the project directory:
```bash
cd "student-record-lookup"
```

### Step 2: Create & Activate Virtual Environment
```bash
python -m venv venv
# On Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# On Linux/macOS:
source venv/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Run Flask Server
```bash
python app.py
```

### Step 5: Open Application
Open your browser and visit:  
`http://127.0.0.1:5000/`

---

## 10. Example Test Searches

| Input Roll No | Expected Result | Binary Search Comparisons | Linear Search Comparisons |
| :---: | :---: | :---: | :---: |
| `104` | **Found** (Sneha Rao) | 4 | 4 |
| `125` | **Found** (Manish Pandey) | 1 | 25 |
| `150` | **Found** (Zoya Khan) | 6 | 50 |
| `999` | **Not Found** | 6 | 50 |

---

## 11. Presentation Guide (5–7 Minute Slide Outline)

- **Slide 1: Title** — Student Record Lookup System Using Binary Search
- **Slide 2: Problem Statement** — University student record lookup efficiency
- **Slide 3: Proposed Solution** — Web-based DAA algorithm visualizer
- **Slide 4: Binary Search Algorithm** — Divide-and-conquer principles & iterative logic
- **Slide 5: Complexity Analysis** — $O(\log n)$ time complexity derivation
- **Slide 6: Live Demonstration** — Demonstrating searches for 104, 125, 150, and 999
- **Slide 7: Conclusion** — Binary Search reduces comparisons drastically ($6$ vs $50$ for worst-case in 50 records)

---

## 12. Viva Q&A Reference

1. **Q: Why use Binary Search for student record lookup?**  
   *A:* Because student roll numbers can be sorted. Binary Search cuts the search space in half at each step, reducing time complexity from $O(n)$ to $O(\log n)$.

2. **Q: What is the worst-case time complexity of Binary Search?**  
   *A:* $O(\log n)$. For $N=50$ records, maximum comparisons required is $\lceil \log_2(50) \rceil = 6$.

3. **Q: Why must data be sorted for Binary Search?**  
   *A:* Binary Search relies on order to determine whether to discard the left or right half of the remaining elements. Without sorting, half-elimination cannot guarantee target exclusion.

4. **Q: Why did you implement Binary Search iteratively instead of recursively?**  
   *A:* Iterative implementation uses $O(1)$ auxiliary space, avoiding function call stack overhead and stack overflow risks associated with recursion ($O(\log n)$ call stack space).

5. **Q: What is the formula for calculating the middle index?**  
   *A:* `mid = (low + high) // 2`.
