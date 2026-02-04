
import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pyodbc
from datetime import datetime

# Initialize Flask with a reference to the current directory for static files
app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

# Azure SQL Connection String - In Production, use Environment Variables
CONN_STR = os.getenv("AZURE_SQL_CONNECTIONSTRING", "")

def get_db_connection():
    if not CONN_STR:
        print("CRITICAL: AZURE_SQL_CONNECTIONSTRING not found in environment variables.")
        return None
    try:
        return pyodbc.connect(CONN_STR)
    except Exception as e:
        print(f"Database Connection Error: {e}")
        return None

# Serve the Frontend
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

# Catch-all for React routing (serves index.html for any unknown route)
@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/check-submission', methods=['GET'])
def check_submission():
    employee_id = request.args.get('employee_id')
    work_date = request.args.get('work_date')
    
    if not employee_id or not work_date:
        return jsonify({"exists": False}), 400
        
    conn = get_db_connection()
    if not conn:
        # If DB isn't connected, we can't verify, but we shouldn't block local dev
        return jsonify({"exists": False, "status": "no_db_configured"})

    try:
        cursor = conn.cursor()
        query = "SELECT COUNT(*) FROM DailyPerformanceLogs WHERE Employee_Id = ? AND Work_Date = ?"
        cursor.execute(query, (employee_id, work_date))
        count = cursor.fetchone()[0]
        conn.close()
        return jsonify({"exists": count > 0})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/submit', methods=['POST'])
def submit_log():
    data = request.json
    
    mandatory_fields = ['Employee_Id', 'Full_Name', 'Work_Date', 'Work_Status', 'Task_Summary']
    for field in mandatory_fields:
        if not data.get(field):
            return jsonify({"error": f"{field} is mandatory"}), 400
            
    if len(str(data.get('Employee_Id'))) != 5:
        return jsonify({"error": "Member ID must be 5 digits"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    try:
        cursor = conn.cursor()
        
        # DOUBLE CHECK: Ensure no duplicate entry exists before inserting
        check_query = "SELECT COUNT(*) FROM DailyPerformanceLogs WHERE Employee_Id = ? AND Work_Date = ?"
        cursor.execute(check_query, (data['Employee_Id'], data['Work_Date']))
        if cursor.fetchone()[0] > 0:
            return jsonify({"error": "A submission already exists for this ID and Date."}), 409

        insert_query = """
        INSERT INTO DailyPerformanceLogs 
        (Employee_Id, Full_Name, Designation_Role, Department, Reporting_Manager, 
         Employment_Type, Shift_Type, Work_Date, Work_Status, Hours_Worked, 
         Overtime_Hours, Project_Manager_Name, Leave_Type, Task_Summary, 
         Blocker_Reason, Active_Projects_Count, Project_Names, Task_Type)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """
        cursor.execute(insert_query, (
            data['Employee_Id'], data['Full_Name'], data.get('Designation_Role'),
            data.get('Department'), data.get('Reporting_Manager'), data.get('Employment_Type'),
            data.get('Shift_Type'), data['Work_Date'], data['Work_Status'],
            data.get('Hours_Worked', 0), data.get('Overtime_Hours', 0), 
            data.get('Project_Manager_Name'), data.get('Leave_Type'), data['Task_Summary'],
            data.get('Blocker_Reason'), data.get('Active_Projects_Count', 0),
            data.get('Project_Names'), data.get('Task_Type')
        ))
        conn.commit()
        return jsonify({"message": "Log submitted successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

if __name__ == '__main__':
    # Local development
    app.run(debug=True, port=5000)
