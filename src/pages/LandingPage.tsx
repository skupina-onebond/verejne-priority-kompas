import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f8fc] flex flex-col justify-center items-center text-center px-6 relative">
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

      {/* Jemný doplnkový text úplne dole */}
      <p className="absolute bottom-20 text-xs text-slate-500 max-w-md px-4">
        Tento nástroj byl vytvořen pro potřeby Centra pro regionální rozvoj (CRR) a slouží k efektivní kontrole veřejných zakázek z hlediska jejich závažnosti a rizikovosti.
      </p>

      <div className="absolute bottom-6">
        <img src="/CRR-logo.svg" alt="Logo CRR" className="h-12" />
      </div>
    </div>
  );
};

export default LandingPage;
