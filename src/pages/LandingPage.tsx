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

      <div className="max-w-xl text-center">
  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
    Vítejte v Doris!
  </h1>
  <p className="text-lg text-slate-700 mb-10">
    Jsem systém pro analýzu veřejných zakázek
  </p>
        <button
          onClick={() => navigate("/seznam")}
          className="bg-[#215197] hover:bg-[#1a3e78] text-white px-6 py-2 text-lg rounded-md"
        >
          Vstoupit
        </button>
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex items-center text-sm text-slate-600">
  <img src="/CRR-logo.svg" alt="Logo CRR" className="h-8 mr-4" />
  <p className="text-left">
    Tento nástroj byl vytvořen pro potřeby Centra pro regionální rozvoj (CRR)
    a slouží k efektivní kontrole veřejných zakázek.
  </p>
</div>
    </div>
  );
};

export default LandingPage;
