import React from 'react';More actions

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#f5f8fc] flex flex-col justify-center items-center text-center px-6">
      <div className="max-w-xl">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Vítejte v systému pro analýzu veřejných zakázek
        </h1>
        <p className="text-slate-700 text-lg mb-8">
Tento nástroj vznikl na míru potřebám Centra pro regionální rozvoj (CRR).
Umožňuje efektivní kontrolu veřejných zakázek z hlediska jejich závažnosti a rizikovosti.
        </p>

        {/* ✅ Obyčajný link namiesto tlačidla */}
        <a
          href="/seznam"
          className="inline-block bg-[#215197] hover:bg-[#1a3e78] text-white px-6 py-2 text-lg rounded-md"
        >
          Vstoupit do systému
        </a>
      </div>

      <div className="absolute bottom-6">
        <img src="/CRR-logo.svg" alt="Logo CRR" className="h-12" />
      </div>
    </div>
  );
};

export default LandingPage;
