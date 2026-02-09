import React, { useState } from 'react';
import { EmployeeDailyStatus } from './types';

interface Props {
  onSubmit: (data: EmployeeDailyStatus) => void;
}

const StatusForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<any>({
    Work_Status: 'On Track',
    Leave_Type: 'None',
    Task_Type: 'Client Project'
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow space-y-5"
    >
      {/* Employee Info */}
      <input
        name="Employee_Id"
        type="number"
        placeholder="Employee ID"
        className="input"
        required
        onChange={handleChange}
      />

      <input
        name="Full_Name"
        type="text"
        placeholder="Full Name"
        className="input"
        required
        onChange={handleChange}
      />

      {/* Dropdowns */}
      <select name="Designation_Role" className="input" onChange={handleChange}>
        {[
          'Associate Data Analyst',
          'Associate Data Engineer',
          'Data Engineer',
          'Data Analyst',
          'Data Scientist',
          'Manager Data Science',
          'Data Engineer Lead',
          'Data Analyst Lead',
          'Associate Data Scientist',
          'Data Scientist Lead',
          'HR Generalist',
          'Senior HR Generalist'
        ].map(v => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>

      <select name="Department" className="input" onChange={handleChange}>
        {['Data Engineering', 'Data Analytics', 'Data Science', 'HR'].map(v => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>

      <select name="Employment_Type" className="input" onChange={handleChange}>
        {['Full-time', 'Part-time', 'Contract', 'Internship'].map(v => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>

      <select name="Shift_Type" className="input" onChange={handleChange}>
        {['General', 'Night', 'Rotational'].map(v => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>

      <input
        name="Work_Date"
        type="date"
        className="input"
        required
        onChange={handleChange}
      />

      <select name="Work_Status" className="input" onChange={handleChange}>
        {['On Track', 'Delayed'].map(v => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>

      <input
        name="Hours_Worked"
        type="number"
        step="0.25"
        placeholder="Hours Worked"
        className="input"
        onChange={handleChange}
      />

      <input
        name="Overtime_Hours"
        type="number"
        step="0.25"
        placeholder="Overtime Hours"
        className="input"
        onChange={handleChange}
      />

      <input
        name="Project_Manager_Name"
        type="text"
        placeholder="Project Manager Name"
        className="input"
        onChange={handleChange}
      />

      <select name="Leave_Type" className="input" onChange={handleChange}>
        {['None', 'Sick Leave', 'Casual Leave', 'Paid Leave', 'Unpaid Leave'].map(v => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>

      <textarea
        name="Task_Summary"
        placeholder="Task Summary"
        className="input h-24"
        onChange={handleChange}
      />

      <textarea
        name="Blocker_Reason"
        placeholder="Blocker Reason (if any)"
        className="input h-20"
        onChange={handleChange}
      />

      <input
        name="Active_Projects_Count"
        type="number"
        placeholder="Active Projects Count"
        className="input"
        onChange={handleChange}
      />

      <input
        name="Project_Names"
        type="text"
        placeholder="Project Names (comma separated)"
        className="input"
        onChange={handleChange}
      />

      <select name="Task_Type" className="input" onChange={handleChange}>
        {['Client Project', 'Internal Task', 'Training', 'Innovation'].map(v => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default StatusForm;

 
