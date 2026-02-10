import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pyodbc

# ======================================================
# PATH CONFIGURATION
# ======================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DIST_DIR = os.path.join(BASE_DIR, "dist")

# ======================================================
# FLASK APP CONFIG
# ======================================================

app = Flask(
    __name__,
    static_folder=DIST_DIR,
    static_url_path=""
)

CORS(app)

# ======================================================
# DATABASE CONFIG
# ======================================================

CONN_STR = os.getenv("AZURE_SQL_CONNECTIONSTRING")

def get_db_connection():
    if not CONN_STR:
        raise RuntimeError("AZURE_SQL_CONNECTIONSTRING not set")
    return pyodbc.connect(CONN_STR)

# ======================================================
# FRONTEND ROUTES (SERVE VITE BUILD)
# ======================================================

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    """
    Serve React (Vite) frontend.
    All non-API routes return index.html.
    """
    full_path = os.path.join(DIST_DIR, path)

    if path != "" and os.path.exists(full_path):
        return send_from_directory(DIST_DIR, path)

    return send_from_directory(DIST_DIR, "index.html")

# ======================================================
# API ROUTES
# ======================================================

@app.route("/api/check-submission", methods=["GET"])
def check_submission():
    employee_id = request.args.get("employee_id")
    work_date = request.args.get("work_date")

    if not employee_id or not work_date:
        return jsonify({"exists": False}), 400

    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT COUNT(*)
            FROM Employee_Daily_Status
            WHERE Employee_Id = ? AND Work_Date = ?
            """,
            (employee_id, work_date)
        )
        return jsonify({"exists": cursor.fetchone()[0] > 0})
    finally:
        conn.close()

@app.route("/api/submit", methods=["POST"])
def submit_log():
    data = request.get_json(force=True)

    required_fields = [
        "Employee_Id",
        "Full_Name",
        "Work_Date",
        "Work_Status",
        "Task_Summary"
    ]

    for field in required_fields:
        if not data.get(field):
            return jsonify({"error": f"{field} is required"}), 400

    if len(str(data["Employee_Id"])) != 5:
        return jsonify({"error": "Employee_Id must be exactly 5 digits"}), 400

    conn = get_db_connection()
    try:
        cursor = conn.cursor()

        # Prevent duplicate submission
        cursor.execute(
            """
            SELECT COUNT(*)
            FROM Employee_Daily_Status
            WHERE Employee_Id = ? AND Work_Date = ?
            """,
            (data["Employee_Id"], data["Work_Date"])
        )
        if cursor.fetchone()[0] > 0:
            return jsonify({
                "error": "Submission already exists for this employee and date"
            }), 409

        cursor.execute(
            """
            INSERT INTO Employee_Daily_Status (
                Employee_Id,
                Full_Name,
                Designation_Role,
                Department,
                Reporting_Manager,
                Employment_Type,
                Shift_Type,
                Work_Date,
                Work_Status,
                Hours_Worked,
                Overtime_Hours,
                Project_Manager_Name,
                Leave_Type,
                Task_Summary,
                Blocker_Reason,
                Active_Projects_Count,
                Project_Names,
                Task_Type
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                data["Employee_Id"],
                data["Full_Name"],
                data.get("Designation_Role"),
                data.get("Department"),
                data.get("Reporting_Manager"),
                data.get("Employment_Type"),
                data.get("Shift_Type"),
                data["Work_Date"],
                data["Work_Status"],
                data.get("Hours_Worked", 0),
                data.get("Overtime_Hours", 0),
                data.get("Project_Manager_Name"),
                data.get("Leave_Type"),
                data["Task_Summary"],
                data.get("Blocker_Reason"),
                data.get("Active_Projects_Count", 0),
                data.get("Project_Names"),
                data.get("Task_Type")
            )
        )

        conn.commit()
        return jsonify({"message": "Log submitted successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        conn.close()

# ======================================================
# LOCAL DEV ENTRY
# ======================================================

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
 