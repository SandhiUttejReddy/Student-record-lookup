import os
import json
from flask import Flask, render_template, request, jsonify
from algorithms.binary_search import binary_search
from algorithms.linear_search import linear_search

app = Flask(__name__)

# Global student data list
STUDENTS = []

def load_student_data():
    """Loads student records from JSON file and ensures they are sorted by roll_no."""
    global STUDENTS
    data_path = os.path.join(os.path.dirname(__file__), 'data', 'students.json')
    try:
        with open(data_path, 'r', encoding='utf-8') as f:
            STUDENTS = json.load(f)
        # CRITICAL DAA REQUIREMENT: Ensure records are sorted by roll_no for Binary Search
        STUDENTS.sort(key=lambda s: s["roll_no"])
        print(f"[INFO] Successfully loaded and sorted {len(STUDENTS)} student records.")
    except Exception as e:
        print(f"[ERROR] Failed to load student data: {e}")
        STUDENTS = []

# Load data on application start
load_student_data()

@app.route('/')
def index():
    """Renders the main application dashboard."""
    return render_template('index.html')

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Returns dataset statistics and DAA algorithm specifications."""
    return jsonify({
        "success": True,
        "total_students": len(STUDENTS),
        "algorithm": "Binary Search",
        "time_complexity": "O(log n)",
        "space_complexity": "O(1)"
    })

@app.route('/api/search', methods=['GET'])
def search_student():
    """
    Performs Binary Search for a student by roll number.
    Query parameter: roll (integer)
    """
    roll_param = request.args.get('roll', '').strip()
    
    if not roll_param:
        return jsonify({
            "success": False,
            "error": "Roll number parameter is required."
        }), 400

    try:
        target_roll = int(roll_param)
    except ValueError:
        return jsonify({
            "success": False,
            "error": "Roll number must be a valid integer."
        }), 400

    if target_roll < 0:
        return jsonify({
            "success": False,
            "error": "Roll number cannot be negative."
        }), 400

    # Perform Binary Search
    result = binary_search(STUDENTS, target_roll)
    
    response = {
        "success": True,
        "found": result["found"],
        "student": result["student"],
        "steps": result["steps"],
        "comparisons": result["comparisons"],
        "complexity": "O(log n)"
    }
    
    if not result["found"]:
        response["message"] = f"No student found with roll number {target_roll}."

    return jsonify(response)

@app.route('/api/compare', methods=['GET'])
def compare_algorithms():
    """
    Compares Binary Search and Linear Search for a given roll number.
    Query parameter: roll (integer)
    """
    roll_param = request.args.get('roll', '').strip()
    
    if not roll_param:
        return jsonify({
            "success": False,
            "error": "Roll number parameter is required."
        }), 400

    try:
        target_roll = int(roll_param)
    except ValueError:
        return jsonify({
            "success": False,
            "error": "Roll number must be a valid integer."
        }), 400

    if target_roll < 0:
        return jsonify({
            "success": False,
            "error": "Roll number cannot be negative."
        }), 400

    b_res = binary_search(STUDENTS, target_roll)
    l_res = linear_search(STUDENTS, target_roll)

    return jsonify({
        "success": True,
        "roll_number": target_roll,
        "binary_search": {
            "found": b_res["found"],
            "comparisons": b_res["comparisons"],
            "complexity": "O(log n)"
        },
        "linear_search": {
            "found": l_res["found"],
            "comparisons": l_res["comparisons"],
            "complexity": "O(n)"
        }
    })

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
