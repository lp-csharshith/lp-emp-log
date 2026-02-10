import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-black">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-black">
          LP Performance Organization
        </h1>

        <p className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-slate-500">
          Daily Status Reporting Portal
        </p>
      </div>
    </header>
  );
};

export default Header;
 