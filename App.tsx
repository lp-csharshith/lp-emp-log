import React, { useState } from 'react';
import Header from './components/Header';
import StatusForm from './components/StatusForm';
import { EmployeeDailyStatus } from './types';
import { CheckCircle2, Home } from 'lucide-react';

const App: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastSubmission, setLastSubmission] =
    useState<EmployeeDailyStatus | null>(null);
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  const handleFormSubmit = async (data: EmployeeDailyStatus) => {
    setLoading(true);

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Submission failed');
        setLoading(false);
        return;
      }

      const result = await res.json();

      setLastSubmission(data);
      setSubmissionId(result.id || null);
      setSubmitted(true);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      alert('Network error while submitting');
    } finally {
      setLoading(false);
    }
  };

  const returnToDashboard = () => {
    setSubmitted(false);
    setLastSubmission(null);
    setSubmissionId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow py-12 md:py-20 px-4">
        {!submitted ? (
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
                Daily Status
              </h2>
            </div>

            <StatusForm onSubmit={handleFormSubmit} />

            {loading && (
              <p className="mt-6 text-center font-black text-slate-500 uppercase tracking-widest text-xs">
                Submitting… Please wait
              </p>
            )}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto mt-10">
            <div className="bg-white rounded-[3rem] shadow-2xl border-4 border-black overflow-hidden">
              <div className="bg-black p-16 text-center">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mx-auto mb-8 shadow-xl">
                  <CheckCircle2 className="w-12 h-12 text-black" />
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-white uppercase mb-4">
                  Successfully Submitted
                </h2>

                <div className="h-1 w-20 bg-white/20 mx-auto rounded-full mb-4"></div>

                {submissionId && (
                  <p className="text-white font-black opacity-70 tracking-[0.3em] text-[10px] uppercase">
                    Log ID: {submissionId}
                  </p>
                )}
              </div>

              <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm">
                  <div>
                    <p className="text-slate-400 font-black uppercase tracking-widest text-[9px]">
                      Employee
                    </p>
                    <p className="text-black font-black uppercase text-lg">
                      {lastSubmission?.Full_Name}
                    </p>
                  </div>

                  <div className="md:text-right">
                    <p className="text-slate-400 font-black uppercase tracking-widest text-[9px]">
                      Work Date
                    </p>
                    <p className="text-black font-black uppercase text-lg">
                      {new Date(
                        lastSubmission?.Work_Date || ''
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-400 font-black uppercase tracking-widest text-[9px]">
                      Hours Worked
                    </p>
                    <p className="text-black font-black uppercase text-lg">
                      {lastSubmission?.Hours_Worked} hrs
                    </p>
                  </div>

                  <div className="md:text-right">
                    <p className="text-slate-400 font-black uppercase tracking-widest text-[9px]">
                      Status
                    </p>
                    <p
                      className={`text-lg font-black uppercase ${
                        lastSubmission?.Work_Status === 'Delayed'
                          ? 'text-red-600'
                          : 'text-green-600'
                      }`}
                    >
                      {lastSubmission?.Work_Status}
                    </p>
                  </div>
                </div>

                <div className="pt-12 border-t-4 border-black flex justify-center">
                  <button
                    onClick={returnToDashboard}
                    className="group inline-flex items-center gap-3 px-16 py-8 bg-black text-white font-black rounded-2xl uppercase tracking-[0.2em] text-sm hover:bg-slate-800 transition-all active:scale-[0.98]"
                  >
                    <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    New Entry
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="py-12 px-4 border-t border-slate-100">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-center">
          LP PERFORMANCE ORGANIZATION • DAILY LOG TERMINAL
        </p>
      </footer>
    </div>
  );
};

export default App;
 