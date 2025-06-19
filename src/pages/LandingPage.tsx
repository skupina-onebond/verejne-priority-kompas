import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f8fc] flex flex-col justify-center items-center text-center px-6 relative">
      {/* Logo DORIS hore vľavo */}
      <div className="absolute top-6 left-6">
        <img src="/Doris-logo.png" alt="Logo DORIS" className="h-7" />
      </div>

      {/* Hlavný obsah */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Vítejte v Doris
        </h1>
        <p className="text-slate-600 text-base mb-8">
          Systém pro analýzu veřejných zakázek a jejich efektivní kontrolu
        </p>

        <button
          onClick={() => navigate("/seznam")}
          className="bg-[#215197] hover:bg-[#1a3e78] text-white px-6 py-2 text-lg rounded-md"
        >
          Vstoupit do systému
        </button>
      </div>

      {/* CRR info dole vľavo */}
      <div className="absolute bottom-6 left-6 flex items-center gap-3 text-sm text-slate-500">
        <img src="/CRR-logo.svg" alt="Logo CRR" className="h-8" />
        <p className="text-xs leading-snug">
          Tento nástroj byl vytvořen pro potřeby Centra pro regionální rozvoj (CRR).
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
