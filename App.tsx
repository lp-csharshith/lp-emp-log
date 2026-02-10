import React, { useState } from 'react';
import Header from './Header';
import StatusForm from './StatusForm';
import { EmployeeDailyStatus } from './types';
import { CheckCircle2, RefreshCcw } from 'lucide-react';

const App: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data: EmployeeDailyStatus) => {
    setLoading(true);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || 'Submission failed');
        setLoading(false);
        return;
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="py-12 md:py-20 px-4">
        {!submitted ? (
          <div className="max-w-4xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-black mb-3">
                Daily Status Entry
              </h2>
              <p className="text-slate-500 font-medium">
                Real-time status tracking with automated overtime detection.
              </p>
            </div>

            <StatusForm onSubmit={handleFormSubmit} />

            {loading && (
              <p className="text-center mt-6 font-bold text-slate-600">
                Submitting… please wait
              </p>
            )}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto mt-20 p-12 bg-white rounded-[3rem] shadow-2xl text-center">
            <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-10 h-10 text-indigo-600" />
            </div>

            <h2 className="text-3xl font-black mb-4">
              Status Submitted
            </h2>

            <p className="text-slate-500 mb-10 font-medium">
              Your daily performance log has been recorded successfully.
            </p>

            <button
              onClick={() => setSubmitted(false)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all"
            >
              <RefreshCcw className="w-4 h-4" />
              Submit another log
            </button>
          </div>
        )}
      </main>

      <footer className="py-12 text-center opacity-40">
        <p className="text-[10px] font-black uppercase tracking-[0.3em]">
          LP PERFORMANCE ORGANIZATION • DAILY STATUS TERMINAL
        </p>
      </footer>
    </div>
  );
};

export default App;
 