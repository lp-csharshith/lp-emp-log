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
      ...formData,
      Employee_Id: Number(formData.Employee_Id),
      Blocker_Reason:
        hasBlockers === 'Yes' || formData.Work_Status === 'Delayed'
          ? formData.Blocker_Reason
          : null
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[2rem] shadow-2xl border-2 border-black space-y-10">

      {/* Employee */}
      <section>
        <h3 className="font-black mb-4 flex gap-2 items-center">
          <User /> Employee Details
        </h3>

        <input
          name="Employee_Id"
          type="number"
          placeholder="Employee ID (5 digits)"
          required
          className="input"
          onChange={handleChange}
        />

        <input
          name="Full_Name"
          placeholder="Full Name"
          required
          className="input"
          onChange={handleChange}
        />
      </section>

      {/* Work */}
      <section>
        <h3 className="font-black mb-4 flex gap-2 items-center">
          <Clock /> Work Info
        </h3>

        <input
          type="date"
          name="Work_Date"
          value={formData.Work_Date}
          className="input"
          onChange={handleChange}
        />

        <input
          type="number"
          name="Hours_Worked"
          step="0.1"
          className="input"
          onChange={handleChange}
        />

        <select name="Work_Status" className="input" onChange={handleChange}>
          <option>On Track</option>
          <option>Delayed</option>
        </select>

        {formData.Work_Status === 'Delayed' && (
          <textarea
            name="Blocker_Reason"
            placeholder="Reason for delay"
            className="input"
            onChange={handleChange}
          />
        )}
      </section>

      {/* Task */}
      <section>
        <h3 className="font-black mb-4 flex gap-2 items-center">
          <ClipboardList /> Task
        </h3>

        <textarea
          name="Task_Summary"
          placeholder="Task Summary"
          className="input"
          onChange={handleChange}
        />

        <select
          value={hasBlockers}
          onChange={e => setHasBlockers(e.target.value as 'Yes' | 'No')}
          className="input"
        >
          <option>No</option>
          <option>Yes</option>
        </select>

        {hasBlockers === 'Yes' && (
          <textarea
            name="Blocker_Reason"
            placeholder="Describe blockers"
            className="input"
            onChange={handleChange}
          />
        )}
      </section>

      <button type="submit" className="w-full bg-black text-white py-5 rounded-2xl font-black">
        <Send /> Submit Status
      </button>
    </form>
  );
};

export default StatusForm;
 