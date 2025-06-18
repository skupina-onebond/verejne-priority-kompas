import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f8fc] flex flex-col justify-center items-center text-center px-6 relative">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
          Vítejte v systému pro analýzu veřejných zakázek
        </h1>

        <p className="text-slate-600 text-base mb-10 max-w-md mx-auto">
          Nástroj vytvořený pro Centrum pro regionální rozvoj (CRR) pro efektivní kontrolu veřejných zakázek z hlediska jejich závažnosti a rizikovosti.
        </p>

        <button
          onClick={() => navigate("/seznam")}
          className="bg-[#215197] hover:bg-[#1a3e78] text-white px-6 py-2 text-lg rounded-md"
        >
          Vstoupit do systému
        </button>
      </div>

      <div className="absolute bottom-6 opacity-50">
        <img src="/CRR-logo.svg" alt="Logo CRR" className="h-12" />
      </div>
    </div>
  );
};

export default LandingPage;
