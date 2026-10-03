"""
Linear Search Algorithm Implementation for Student Record Lookup.

Time Complexity: O(n) - Worst & Average Case, O(1) - Best Case
Space Complexity: O(1)
"""

def linear_search(students, target_roll):
    """
    Performs a sequential Linear Search on the list of student records.
    
    :param students: List of dicts
    :param target_roll: int, roll number to search for
    :return: dict containing found status, student object (if found), and total comparisons count
    """
    comparisons = 0

    for student in students:
        comparisons += 1
        if student["roll_no"] == target_roll:
            return {
                "found": True,
                "student": student,
                "comparisons": comparisons
            }

    return {
        "found": False,
        "student": None,
        "comparisons": comparisons
    }
