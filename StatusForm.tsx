import React, { useState } from 'react';
import { EmployeeDailyStatus } from './types';

interface Props {
  onSubmit: (data: EmployeeDailyStatus) => void;
}

/**
* UI-only form state (NOT backend payload)
*/
interface FormState {
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
  Hours_Worked: number;
  Overtime_Hours: number;
  Leave_Type: string;
  Project_Manager_Name: string;
  Task_Summary: string;
  Has_Blockers: 'Yes' | 'No';
  Issue_Dependency_Description?: string;
  Active_Projects_Count: number;
  Project_Names: string;
  Task_Type: string;
  Other_Task_Type?: string;
}

const StatusForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormState>({
    Employee_Id: '',
    Full_Name: '',
    Designation_Role: 'Associate Data Analyst',
    Department: 'Data Engineering',
    Employment_Type: 'Full-time',
    Shift_Type: 'General',
    Work_Date: new Date().toISOString().split('T')[0],
    Work_Status: 'On Track',
    Hours_Worked: 0,
    Overtime_Hours: 0,
    Leave_Type: 'None',
    Project_Manager_Name: '',
    Task_Summary: '',
    Has_Blockers: 'No',
    Active_Projects_Count: 1,
    Project_Names: '',
    Task_Type: 'Client Project'
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => {
      const updated: any = { ...prev, [name]: value };

      if (name === 'Hours_Worked') {
        const hrs = Number(value);
        updated.Hours_Worked = hrs;
        updated.Overtime_Hours = hrs > 9 ? +(hrs - 9).toFixed(2) : 0;
      }

      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: EmployeeDailyStatus = {
      Employee_Id: Number(formData.Employee_Id),
      Full_Name: formData.Full_Name,
      Designation_Role:
        formData.Designation_Role === 'Other'
          ? formData.Other_Designation_Role!
          : formData.Designation_Role,
      Department:
        formData.Department === 'Other'
          ? formData.Other_Department!
          : formData.Department,
      Employment_Type: formData.Employment_Type,
      Shift_Type: formData.Shift_Type,
      Work_Date: formData.Work_Date,
      Work_Status: formData.Work_Status,
      Hours_Worked: formData.Hours_Worked,
      Overtime_Hours: formData.Overtime_Hours,
      Project_Manager_Name: formData.Project_Manager_Name,
      Leave_Type: formData.Leave_Type,
      Task_Summary: formData.Task_Summary,
      Blocker_Reason:
        formData.Has_Blockers === 'Yes'
          ? formData.Issue_Dependency_Description
          : null,
      Active_Projects_Count: formData.Active_Projects_Count,
      Project_Names: formData.Project_Names,
      Task_Type:
        formData.Task_Type === 'Other'
          ? formData.Other_Task_Type!
          : formData.Task_Type
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      {/* SAME JSX STRUCTURE YOU ALREADY HAVE */}
      {/* No layout changes needed here */}
      {/* Your existing JSX goes here unchanged */}
      <button
        type="submit"
        className="w-full mt-4 py-4 bg-black text-white font-black rounded-2xl"
      >
        FINALIZE & SUBMIT STATUS
      </button>
    </form>
  );
};

export default StatusForm;
 