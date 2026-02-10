/* ===============================
   1️⃣ FORM STATE (UI ONLY)
   =============================== */

export interface StatusFormState {
  Employee_Id: string;
  Full_Name: string;

  Designation_Role: string;
  Other_Designation_Role?: string;

  Department: string;
  Other_Department?: string;

  Employment_Type: string;
  Shift_Type: string;

  Work_Date: string;
  Work_Status: 'On Track' | 'Delayed';
  Work_Status_Reason?: string;

  Hours_Worked: string;
  Overtime_Hours: string;

  Leave_Type: string;

  Task_Type: string;
  Other_Task_Type?: string;

  Task_Summary: string;

  Has_Blockers: 'Yes' | 'No';
  Issue_Dependency_Description?: string;

  Short_Hours_Reason?: string;

  Project_Manager_Name: string;
  Active_Projects_Count: string;
  Project_Names: string;
}

/* ===============================
   2️⃣ API PAYLOAD (BACKEND SAFE)
   =============================== */

export interface EmployeeDailyStatus {
  Employee_Id: string;
  Full_Name: string;
  Designation_Role: string;
  Department: string;

  Employment_Type: string;
  Shift_Type: string;

  Work_Date: string;
  Work_Status: 'On Track' | 'Delayed';

  Hours_Worked: number;
  Overtime_Hours: number;

  Leave_Type: string;

  Task_Summary: string;
  Blocker_Reason?: string;

  Project_Manager_Name: string;
  Active_Projects_Count: number;
  Project_Names: string;

  Task_Type: string;
}

 