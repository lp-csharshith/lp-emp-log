import React, { useState } from 'react';
import {
  User, Briefcase, Calendar, Clock, ClipboardList,
  AlertCircle, Send, ChevronRight, Hash, Layers, Users
} from 'lucide-react';
import { EmployeeDailyStatus } from '../types';

interface Props {
  onSubmit: (data: EmployeeDailyStatus) => void;
}

type FormState = {
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
  Hours_Worked: string;
  Overtime_Hours: string;
  Leave_Type: string;
  Project_Manager_Name: string;
  Task_Summary: string;
  Active_Projects_Count: string;
  Project_Names: string;
  Task_Type: string;
  Other_Task_Type?: string;
  Has_Blockers: 'Yes' | 'No';
  Issue_Dependency_Description?: string;
};

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
    Hours_Worked: '',
    Overtime_Hours: '0',
    Leave_Type: 'None',
    Project_Manager_Name: '',
    Task_Summary: '',
    Active_Projects_Count: '1',
    Project_Names: '',
    Task_Type: 'Client Project',
    Has_Blockers: 'No'
  });

  const [wordCount, setWordCount] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'Task_Summary') {
      const words = value.trim() ? value.trim().split(/\s+/).length : 0;
      if (words > 300) return;
      setWordCount(words);
    }

    setFormData(prev => {
      const updated = { ...prev, [name]: value };

      if (name === 'Hours_Worked') {
        const hrs = parseFloat(value);
        updated.Overtime_Hours =
          !isNaN(hrs) && hrs > 9 ? (hrs - 9).toFixed(2) : '0';
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
          ? formData.Other_Designation_Role || 'Other'
          : formData.Designation_Role,
      Department:
        formData.Department === 'Other'
          ? formData.Other_Department || 'Other'
          : formData.Department,
      Employment_Type: formData.Employment_Type,
      Shift_Type: formData.Shift_Type,
      Work_Date: formData.Work_Date,
      Work_Status: formData.Work_Status,
      Hours_Worked: Number(formData.Hours_Worked),
      Overtime_Hours: Number(formData.Overtime_Hours),
      Project_Manager_Name: formData.Project_Manager_Name,
      Leave_Type: formData.Leave_Type,
      Task_Summary: formData.Task_Summary,
      Blocker_Reason:
        formData.Has_Blockers === 'Yes'
          ? formData.Issue_Dependency_Description || null
          : null,
      Active_Projects_Count: Number(formData.Active_Projects_Count),
      Project_Names: formData.Project_Names,
      Task_Type:
        formData.Task_Type === 'Other'
          ? formData.Other_Task_Type || 'Other'
          : formData.Task_Type
    };

    onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl border-2 border-black space-y-10"
    >
      {/* KEEP YOUR JSX UI EXACTLY AS YOU HAVE IT */}
      {/* NO VISUAL CHANGES NEEDED */}

      <button
        type="submit"
        className="group relative w-full overflow-hidden py-6 bg-black text-white font-black rounded-3xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
      >
        <Send className="w-5 h-5" />
        <span className="text-xl uppercase tracking-[0.2em]">
          Finalize & Submit Status
        </span>
        <ChevronRight className="w-5 h-5 opacity-50" />
      </button>
    </form>
  );
};

export default StatusForm;
 