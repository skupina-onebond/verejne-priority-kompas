import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f8fc] flex flex-col justify-center items-center text-center px-6 relative">
      {/* Logo DORIS hore vľavo */}
      <div className="absolute top-6 left-6">
        <img src="/Doris-logo.png" alt="Logo DORIS" className="h-10" />
      </div>

      {/* Hlavný obsah */}
      <div className="max-w-xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10">
          Vítejte v systému pro analýzu veřejných zakázek
        </h1>

        <button
          onClick={() => navigate("/seznam")}
          className="bg-[#215197] hover:bg-[#1a3e78] text-white px-6 py-2 text-lg rounded-md"
        >
          Vstoupit do systému
        </button>
      </div>

      {/* Info text a logo CRR dole */}
      <div className="absolute bottom-10 flex flex-col items-center text-slate-500 text-sm">
        <p className="mb-2 px-4 max-w-2xl text-center">
          Tento nástroj byl vytvořen pro potřeby Centra pro regionální rozvoj (CRR)
          a slouží k efektivní kontrole veřejných zakázek z hlediska jejich závažnosti a rizikovosti.
        </p>
        <img src="/CRR-logo.svg" alt="Logo CRR" className="h-8 opacity-60" />
      </div>
    </div>
  );
};

export default LandingPage;
