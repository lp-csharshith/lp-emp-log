import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface HeaderProps {
  apiHealthy?: boolean;
  environment?: 'DEV' | 'QA' | 'PROD';
}

const Header: React.FC<HeaderProps> = ({
  apiHealthy = true,
  environment = 'PROD'
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-1.5 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-black tracking-tighter text-black uppercase">
              LP PERFORMANCE
            </span>
            <span className="ml-2 px-2 py-0.5 text-[10px] font-black rounded bg-black text-white">
              {environment}
            </span>
          </div>

          {/* Status */}
          <div className="hidden md:flex items-center gap-4 text-sm font-medium text-slate-500">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
              ${apiHealthy ? 'bg-slate-100 text-slate-500' : 'bg-red-100 text-red-700'}`}>
              {apiHealthy ? 'Terminal Active' : 'Backend Down'}
            </span>

            <div
              className="flex items-center gap-2 border-l pl-4 border-slate-200"
              aria-label="Connection status"
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  apiHealthy ? 'bg-black animate-pulse' : 'bg-red-600'
                }`}
              />
              <span className="text-[10px] font-black uppercase tracking-widest">
                {apiHealthy ? 'Secure Link' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
 