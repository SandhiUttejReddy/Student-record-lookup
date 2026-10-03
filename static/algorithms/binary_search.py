"""
Binary Search Algorithm Implementation for Student Record Lookup.

Time Complexity: O(log n) - Worst & Average Case, O(1) - Best Case
Space Complexity: O(1) - Iterative Implementation
Prerequisite: Data must be sorted by roll_no.
"""

def binary_search(students, target_roll):
    """
    Performs an iterative Binary Search on a sorted list of student records.
    
    :param students: List of dicts, sorted by 'roll_no'
    :param target_roll: int, roll number to search for
    :return: dict containing found status, student object (if found), step-by-step trace, and total comparisons count
    """
    low = 0
    high = len(students) - 1
    steps = []
    comparisons = 0
    step_num = 1

    while low <= high:
        mid = (low + high) // 2
        mid_roll = students[mid]["roll_no"]
        comparisons += 1

        if mid_roll == target_roll:
            steps.append({
                "step": step_num,
                "low": low,
                "high": high,
                "mid": mid,
                "roll_no": mid_roll,
                "comparison": f"{target_roll} = {mid_roll}",
                "action": "FOUND",
                "direction": "found"
            })
            return {
                "found": True,
                "student": students[mid],
                "steps": steps,
                "comparisons": comparisons
            }
        elif target_roll < mid_roll:
            steps.append({
                "step": step_num,
                "low": low,
                "high": high,
                "mid": mid,
                "roll_no": mid_roll,
                "comparison": f"{target_roll} < {mid_roll}",
                "action": "Search LEFT half",
                "direction": "left"
            })
            high = mid - 1
        else:
            steps.append({
                "step": step_num,
                "low": low,
                "high": high,
                "mid": mid,
                "roll_no": mid_roll,
                "comparison": f"{target_roll} > {mid_roll}",
                "action": "Search RIGHT half",
                "direction": "right"
            })
            low = mid + 1

        step_num += 1

    return {
        "found": False,
        "student": None,
        "steps": steps,
        "comparisons": comparisons
    }
