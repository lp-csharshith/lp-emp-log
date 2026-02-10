export interface EmployeeDailyStatus {
  Employee_Id: number;
  Full_Name: string;
  Designation_Role: string;
  Department: string;
  Reporting_Manager?: string;
  Employment_Type: string;
  Shift_Type: string;
  Work_Date: string; // ISO date string (YYYY-MM-DD)
  Work_Status: 'On Track' | 'Delayed';
  Hours_Worked: number;
  Overtime_Hours: number;
  Project_Manager_Name: string;
  Leave_Type: string;
  Task_Summary: string;
  Blocker_Reason?: string | null;
  Active_Projects_Count: number;
  Project_Names: string;
  Task_Type: string;
}
 