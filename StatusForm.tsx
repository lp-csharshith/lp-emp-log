import React, { useState } from 'react';
import {
  User, Briefcase, Calendar, Clock, ClipboardList,
  AlertCircle, Send, ChevronRight, Hash, Layers, Users
} from 'lucide-react';
import { EmployeeDailyStatus } from './types';

interface Props {
  onSubmit: (data: EmployeeDailyStatus) => void;
}

const StatusForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<EmployeeDailyStatus>({
    Employee_Id: 0,
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
    Blocker_Reason: '',
    Active_Projects_Count: 1,
    Project_Names: '',
    Task_Type: 'Client Project'
  });

  const [wordCount, setWordCount] = useState(0);
  const [hasBlockers, setHasBlockers] = useState<'Yes' | 'No'>('No');

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

      if (name === 'Task_Summary') {
        setWordCount(value.trim().split(/\s+/).length);
      }

      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const payload: EmployeeDailyStatus = {
    Employee_Id: String(formData.Employee_Id),
    Full_Name: formData.Full_Name,
    Designation_Role:
      formData.Designation_Role === 'Other'
        ? formData.Other_Designation_Role
        : formData.Designation_Role,
    Department:
      formData.Department === 'Other'
        ? formData.Other_Department
        : formData.Department,
    Employment_Type: formData.Employment_Type,
    Shift_Type: formData.Shift_Type,
    Work_Date: formData.Work_Date,
    Work_Status: formData.Work_Status,
    Hours_Worked: Number(formData.Hours_Worked),
    Overtime_Hours: Number(formData.Overtime_Hours || 0),
    Project_Manager_Name: formData.Project_Manager_Name,
    Leave_Type: formData.Leave_Type,
    Task_Summary: formData.Task_Summary,
    Blocker_Reason:
      formData.Has_Blockers === 'Yes'
        ? formData.Issue_Dependency_Description
        : null,
    Active_Projects_Count: Number(formData.Active_Projects_Count),
    Project_Names: formData.Project_Names,
    Task_Type:
      formData.Task_Type === 'Other'
        ? formData.Other_Task_Type
        : formData.Task_Type
  };

  onSubmit(payload);
};
 

  return (
    <form onSubmit={handleSubmit} className="form-card">

  {/* EMPLOYEE IDENTIFICATION */}
  <div className="form-section">
    <h3>Employee Identification</h3>

    <label className="form-label">Employee ID *</label>
    <input name="Employee_Id" className="input" required onChange={handleChange} />

    <label className="form-label">Full Name *</label>
    <input name="Full_Name" className="input" required onChange={handleChange} />

    <div className="form-grid-2">
      <div>
        <label className="form-label">Role & Designation *</label>
        <select name="Designation_Role" className="input" onChange={handleChange}>
          <option>Associate Data Analyst</option>
          <option>Data Engineer</option>
        </select>
      </div>

      <div>
        <label className="form-label">Department *</label>
        <select name="Department" className="input" onChange={handleChange}>
          <option>Data Engineering</option>
          <option>Data Science</option>
        </select>
      </div>
    </div>
  </div>

  {/* WORK SCHEDULE */}
  <div className="form-section">
    <h3>Work Schedule</h3>

    <div className="form-grid-2">
      <div>
        <label className="form-label">Employment Type *</label>
        <select name="Employment_Type" className="input" onChange={handleChange}>
          <option>Full-time</option>
        </select>
      </div>

      <div>
        <label className="form-label">Shift *</label>
        <select name="Shift_Type" className="input" onChange={handleChange}>
          <option>General</option>
        </select>
      </div>
    </div>
  </div>

  {/* PERFORMANCE */}
  <div className="form-section">
    <h3>Performance Tracking</h3>

    <div className="form-grid-2">
      <div>
        <label className="form-label">Work Date *</label>
        <input type="date" name="Work_Date" className="input" onChange={handleChange} />
      </div>

      <div>
        <label className="form-label">Hours Worked *</label>
        <input type="number" name="Hours_Worked" className="input" onChange={handleChange} />
      </div>
    </div>

    <label className="form-label">Daily Work Status *</label>
    <select name="Work_Status" className="input" onChange={handleChange}>
      <option>On Track</option>
      <option>Delayed</option>
    </select>
  </div>

  {/* TASK */}
  <div className="form-section">
    <h3>Activity Details</h3>

    <label className="form-label">Task Summary *</label>
    <textarea name="Task_Summary" className="input" onChange={handleChange} />

    <label className="form-label">Any Blockers?</label>
    <select name="Has_Blockers" className="input" onChange={handleChange}>
      <option>No</option>
      <option>Yes</option>
    </select>
  </div>

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
 