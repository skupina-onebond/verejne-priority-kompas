import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Printer } from "lucide-react";
import { PublicContract } from "@/types/contract";
import { DocumentViewer } from "@/components/DocumentViewer";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { PublicContractCard } from "./PublicContractCard";


interface ContractDetailDialogProps {
  contract: PublicContract;
  isOpen: boolean;
  onClose: () => void;
  onDeepSearch: (subjectName: string) => void;
  analysisResult?: string;
  similarContracts?: PublicContract[];
  onOpenContractDetail?: (contract: PublicContract) => void;
}

export const ContractDetailDialog: React.FC<ContractDetailDialogProps> = ({
  contract,
  isOpen,
  onClose,
  onDeepSearch,
  analysisResult,
  similarContracts,
  onOpenContractDetail
}) => {
  console.log("📦 ContractDetailDialog: similarContracts", similarContracts);
  const [showLoadingPopup, setShowLoadingPopup] = useState<"zadavatel" | "dodavatel" | "administrator" | null>(null);
  const [showSupplierAnalysis, setShowSupplierAnalysis] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showAdminAnalysis, setShowAdminAnalysis] = useState(false);
  const [isLoadingZadavatel, setIsLoadingZadavatel] = useState(false);
  const [isLoadingDodavatel, setIsLoadingDodavatel] = useState(false);
  const [isLoadingAdministrator, setIsLoadingAdministrator] = useState(false);
  const [showSimilar, setShowSimilar] = useState(false);

  const zadavatelRef = useRef<HTMLDivElement>(null);
  const dodavatelRef = useRef<HTMLDivElement>(null);
  const adminRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setShowSupplierAnalysis(false);
      setShowAnalysis(false);
      setShowAdminAnalysis(false);
      setShowLoadingPopup(null);
      setIsLoadingZadavatel(false);
      setIsLoadingDodavatel(false);
      setIsLoadingAdministrator(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const img = new Image();
    img.src = "/CRR-logo-gif.gif";
  }, []);

  useEffect(() => {
    if (analysisResult) setIsLoadingZadavatel(false);
  }, [analysisResult]);

  useEffect(() => {
    if (contract.supplierAnalysis) setIsLoadingDodavatel(false);
  }, [contract.supplierAnalysis]);

  const scrollTo = (ref: React.RefObject<HTMLElement>) => {
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const formatValue = (value: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK'
    }).format(value);
  };

  const handlePrint = () => {
    if (!contentRef.current) return;
    const contentHTML = contentRef.current.innerHTML;
    const printWindow = window.open('', '', 'width=1024,height=768');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Tisk – ${contract.title}</title>
          <style>
            @media print {
              body { font-family: system-ui, sans-serif; padding: 2rem; color: #0f172a; }
              h1, h2, h3, h4 { margin-top: 1.5rem; }
              ul, ol { margin-left: 1.25rem; }
              table { border-collapse: collapse; width: 100%; margin-top: 1rem; }
              th, td { border: 1px solid #ccc; padding: 6px 10px; text-align: left; }
              .badge, .btn, .riskbar { display: none !important; }
            }
          </style>
        </head>
        <body>${contentHTML}</body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  // Compute filtered similar contracts by sector (excluding self)
  const filteredSimilarContracts = similarContracts?.filter(
    (c) => c.id !== contract.id && c.sector === contract.sector
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        ref={contentRef}
        className={`max-w-4xl max-h-[85vh] ${showLoadingPopup ? "overflow-hidden" : "overflow-y-auto"} px-10 py-10`}
      >
        <DialogHeader className="relative">
          <div className="absolute top-0 right-4 mt-4 2">
            <Button
              variant="outline"
              size="sm"
              className="text-[#215197] border-[#215197] hover:bg-[#215197]/10"
              onClick={handlePrint}
            >
              <Printer className="h-4 w-4 mr-2" />
              Tisk
            </Button>
            {/* Zavírací tlačítko tu ponecháváš vpravo hore, ak používaš default Dialog */}
          </div>

          <div className="flex flex-col items-start pr-28"> {/* padding vpravo kvôli tlačítkam */}
            <DialogTitle className="text-2xl font-bold text-slate-900 mb-3 break-words max-w-full leading-snug">
              {contract.title}
            </DialogTitle>

            <div className="flex gap-2 mb-2 flex-wrap">
              <Badge>{contract.sector}</Badge>
              <Badge>{contract.region}</Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-8 text-sm relative items-start">
          <div className="flex-1">
            {contract.description && (
              <section className="mb-6">
                <h3 className="text-base font-semibold text-slate-900 mb-2 uppercase tracking-wide">Popis zakázky</h3>
                <p className="text-sm text-slate-800 whitespace-pre-line">{contract.description}</p>
              </section>
            )}

            <section className="mb-6">
              <h3 className="text-base font-semibold text-slate-900 mb-2 uppercase tracking-wide">Základní informace</h3>
              <p><span className="font-medium">Odvětví:</span> {contract.sector}</p>
              <p><span className="font-medium">Hodnota zakázky:</span> {formatValue(contract.value)}</p>
              <p><span className="font-medium">Region:</span> {contract.region}</p>
              <p><span className="font-medium">Termín podání:</span> {new Date(contract.deadline).toLocaleDateString('cs-CZ')}</p>
              <p><span className="font-medium">Zadavatel:</span> {contract.contracting_authority}</p>
              {contract.administrator && (<p><span className="font-medium">Administrátor zakázky:</span> {contract.administrator}</p>)}
              {contract.supplier && (<p><span className="font-medium">Dodavatel:</span> {contract.supplier}</p>)}
            </section>

            <div className="flex flex-col items-center gap-6 mb-6">
              {/* Skupina 3 akčných buttonov vedľa seba */}
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[#215197] border-[#215197] hover:bg-[#215197]/10 min-w-[180px]"
                  onClick={() => {
                    setShowLoadingPopup("zadavatel");
                    setTimeout(() => {
                      setShowLoadingPopup(null);
                      setShowAnalysis(true);
                      scrollTo(zadavatelRef);
                      onDeepSearch(contract.contracting_authority);
                    }, 7000);
                  }}
                >
                  Prověřit zadavatele<Search className="h-4 w-4 ml-1" />
                </Button>

                {contract.administrator && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#215197] border-[#215197] hover:bg-[#215197]/10 min-w-[180px]"
                    onClick={() => {
                      setShowLoadingPopup("administrator");
                      setIsLoadingAdministrator(true);
                      setTimeout(() => {
                        setShowLoadingPopup(null);
                        setShowAdminAnalysis(true);
                        setIsLoadingAdministrator(false);
                        scrollTo(adminRef);
                        onDeepSearch(contract.administrator!);
                      }, 7000);
                    }}
                  >
                    Prověřit administrátora VZ<Search className="h-4 w-4 ml-1" />
                  </Button>
                )}

                {contract.supplier && (
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-[#215197] hover:bg-[#1c467f] text-white min-w-[180px]"
                    onClick={() => {
                      setShowLoadingPopup("dodavatel");
                      setTimeout(() => {
                        setShowLoadingPopup(null);
                        setShowSupplierAnalysis(true);
                        scrollTo(dodavatelRef);
                      }, 7000);
                    }}
                  >
                    Prověřit dodavatele<Search className="h-4 w-4 ml-1" />
                  </Button>
                )}
              </div>

              {/* Oddelený button na podobné zakázky */}
              <div className="pt-2 border-t border-slate-200 w-full flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#215197] hover:underline"
                  onClick={() => setShowSimilar((prev) => !prev)}
                >
                  Najít podobné zakázky
                </Button>
              </div>
            </div>


            {showSimilar && (() => {
              console.log("similarContracts", similarContracts);
              return filteredSimilarContracts?.length > 0 ? (
                <section className="mt-10">
                  <h3 className="text-base font-semibold text-slate-900 mb-4 uppercase tracking-wide">
                    Podobné zakázky
                  </h3>
                  <div className="w-full flex flex-col gap-4">
                    {filteredSimilarContracts.map((c) => (
                      <div key={c.id} onClick={() => onOpenContractDetail?.(c)} className="cursor-pointer">
                        <PublicContractCard
                          contract={c}
                          onStatusChange={() => {}}
                          onMove={() => {}}
                          onDeepSearch={onDeepSearch}
                          mode="summary"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              ) : (
                <p className="text-sm text-slate-500">Nebyly nalezeny žádné podobné zakázky.</p>
              );
            })()}
            
            
            <section className="mb-6">
              <DocumentViewer contractId={contract.id} />
            </section>

            {contract.findings?.length > 0 && (
              <section className="mb-6">
                <h3 className="text-base font-semibold text-rose-700 mb-2 uppercase tracking-wide">Zjištěné závažnosti</h3>
                <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 space-y-3 text-sm">
                  <ul className="list-disc list-inside space-y-1">
                    {contract.findings.map((finding, idx) => (
                      <li key={idx}>
                        <span className="font-medium text-rose-800">{finding.severity.toUpperCase()}</span>{' '}
                        – <em>{finding.category}</em>: {finding.description}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {contract.recommendations?.length > 0 && (
              <section>
                <h3 className="text-base font-semibold text-slate-900 mb-2 uppercase tracking-wide">Doporučení pro kontrolní orgán</h3>
                <div className="bg-indigo-50 border border-indigo-200 rounded-md p-4 text-sm text-slate-800 space-y-1">
                  <ul className="list-disc list-inside space-y-1">
                    {contract.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </section>
            )}
          </div>
        </div>

        <Accordion
          type="multiple"
          defaultValue={[
            analysisResult ? "zadavatel" : "",
            contract.supplierAnalysis ? "dodavatel" : "",
            contract.administratorAnalysis ? "administrator" : ""
          ].filter(Boolean)}
        >
          {analysisResult && (
            <div ref={zadavatelRef}>
              <AccordionItem value="zadavatel">
                <AccordionTrigger className="text-sm font-semibold text-slate-700 uppercase tracking-widest">
                  Analýza zadavatele
                </AccordionTrigger>
                <AccordionContent className="bg-white border border-slate-300 rounded-lg shadow-sm p-6 text-sm text-slate-900 leading-relaxed whitespace-pre-wrap">
                  {isLoadingZadavatel ? (
                    <div className="flex flex-col items-center justify-center py-4">
                      <img src="/CRR-logo-gif.gif" alt="Načítání..." className="w-24 h-24 mb-2" />
                      <p className="text-sm text-slate-500">Načítám analýzu zadavatele…</p>
                    </div>
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      className="prose prose-sm max-w-none"
                    >
                      {analysisResult}
                    </ReactMarkdown>
                  )}
                </AccordionContent>
              </AccordionItem>
            </div>
          )}

          {contract.supplierAnalysis && showSupplierAnalysis && (
            <div ref={dodavatelRef}>
              <AccordionItem value="dodavatel">
                <AccordionTrigger className="text-sm font-semibold text-slate-700 uppercase tracking-widest">
                  Analýza dodavatele
                </AccordionTrigger>
                <AccordionContent className="bg-white border border-slate-300 rounded-lg shadow-sm p-6 text-sm text-slate-900 leading-relaxed whitespace-pre-wrap">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    className="prose prose-sm max-w-none"
                  >
                    {contract.supplierAnalysis}
                  </ReactMarkdown>
                </AccordionContent>
              </AccordionItem>
            </div>
          )}

          {contract.administratorAnalysis && showAdminAnalysis && (
            <div ref={adminRef}>
              <AccordionItem value="administrator">
                <AccordionTrigger className="text-sm font-semibold text-slate-700 uppercase tracking-widest">
                  Analýza administrátora zakázky
                </AccordionTrigger>
                <AccordionContent className="bg-white border border-slate-300 rounded-lg shadow-sm p-6 text-sm text-slate-900 leading-relaxed whitespace-pre-wrap">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    className="prose prose-sm max-w-none"
                  >
                    {contract.administratorAnalysis}
                  </ReactMarkdown>
                </AccordionContent>
              </AccordionItem>
            </div>
          )}
        </Accordion>

        {showLoadingPopup && (
          <div className="absolute inset-0 z-[10050] pointer-events-auto">
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <img src="/CRR-gif-optimized.gif" alt="Načítání..." className="w-24 h-24 mb-4" />
              <p className="text-sm text-slate-600">
                Načítám analýzu{' '}
                {showLoadingPopup === "zadavatel"
                  ? "zadavatele"
                  : showLoadingPopup === "dodavatel"
                  ? "dodavatele"
                  : "administrátora"}
                …
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
    
  );
};
