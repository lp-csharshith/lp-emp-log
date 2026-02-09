import React from 'react';
import { EmployeeDailyStatus } from './types';

interface Props {
  onSubmit: (data: EmployeeDailyStatus) => void;
}

const StatusForm: React.FC<Props> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({} as EmployeeDailyStatus);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow">
      <button
        type="submit"
        className="px-6 py-3 bg-slate-900 text-white font-bold rounded-lg"
      >
        Submit
      </button>
    </form>
  );
};

export default StatusForm;
 
