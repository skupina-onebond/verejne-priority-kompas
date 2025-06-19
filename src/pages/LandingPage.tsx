import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f8fc] flex flex-col justify-center items-center text-center px-6 relative">
      {/* Logo DORIS hore vľavo */}
      <div className="absolute top-6 left-6">
        <img src="/Doris-logo.png" alt="Logo DORIS" className="h-8" />
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

      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-sm text-slate-600">
  <img src="/CRR-logo.svg" alt="Logo CRR" className="h-8" />
  <p className="ml-4">
    Tento nástroj byl vytvořen pro potřeby Centra pro regionální rozvoj (CRR)
    a slouží k efektivní kontrole veřejných zakázek z hlediska jejich závažnosti a rizikovosti.
  </p>
</div>
    </div>
  );
};

export default LandingPage;
