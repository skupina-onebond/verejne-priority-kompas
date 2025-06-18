import React from 'react';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  const router = useRouter();

  const handleEnter = () => {
    router.push('/fronta');
  };

  return (
    <div className="min-h-screen bg-[#f5f8fc] flex flex-col justify-center items-center text-center px-6">
      <div className="max-w-xl">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Vítejte v systému pro analýzu veřejných zakázek
        </h1>
        <p className="text-slate-700 text-lg mb-8">
          Tento nástroj byl vytvořen speciálně pro potřeby Centra pro regionální rozvoj (CRR).
          Umožňuje efektivní kontrolu, třídění a hodnocení veřejných zakázek.
        </p>
        <Button
          onClick={handleEnter}
          className="bg-[#215197] hover:bg-[#1a3e78] text-white px-6 py-2 text-lg rounded-md"
        >
          Vstoupit do systému
        </Button>
      </div>

      <div className="absolute bottom-6 opacity-50">
        <img src="/crr-logo.png" alt="Logo CRR" className="h-12" />
      </div>
    </div>
  );
};

export default LandingPage;
