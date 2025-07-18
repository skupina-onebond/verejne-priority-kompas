import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Printer, ChevronDown } from "lucide-react";
import { PublicContract } from "@/types/contract";
import { DocumentViewer } from "@/components/DocumentViewer";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { PublicContractCard } from "./PublicContractCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";


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
  similarContracts = [],
  onOpenContractDetail
}) => {
  const [showLoadingPopup, setShowLoadingPopup] = useState<"zadavatel" | "dodavatel" | "administrator" | null>(null);
  const [showSupplierAnalysis, setShowSupplierAnalysis] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showAdminAnalysis, setShowAdminAnalysis] = useState(false);
  const [isLoadingZadavatel, setIsLoadingZadavatel] = useState(false);
  const [isLoadingDodavatel, setIsLoadingDodavatel] = useState(false);
  const [isLoadingAdministrator, setIsLoadingAdministrator] = useState(false);
  const [similarContractsOpen, setSimilarContractsOpen] = useState(true);
  const [showSimilar, setShowSimilar] = useState(true);
  const [nestedContract, setNestedContract] = useState<PublicContract | null>(null);
  const [showGeneratedQuery, setShowGeneratedQuery] = useState(false);
  const [showTenderOriginality, setShowTenderOriginality] = useState(false);
  const [showTenderAlignment, setShowTenderAlignment] = useState(false);
  const tenderUniquenessRef = useRef<HTMLDivElement>(null);

  const zadavatelRef = useRef<HTMLDivElement>(null);
  const dodavatelRef = useRef<HTMLDivElement>(null);
  const adminRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const generatedQueryRef = useRef<HTMLDivElement>(null);

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

  const handleNestedContractOpen = (selectedContract: PublicContract) => {
    // Reset all analysis states when opening a new contract
    setShowSupplierAnalysis(false);
    setShowAnalysis(false);
    setShowAdminAnalysis(false);
    setShowLoadingPopup(null);
    setIsLoadingZadavatel(false);
    setIsLoadingDodavatel(false);
    setIsLoadingAdministrator(false);
    setShowGeneratedQuery(false);
    setShowTenderOriginality(false);
    setShowTenderAlignment(false);
    setNestedContract(selectedContract);
  };

  const handleNestedContractClose = () => {
    setNestedContract(null);
  };

  // Compute filtered similar contracts by sector (excluding self)
  const filteredSimilarContracts = similarContracts?.filter(
    (c) => c.id !== contract.id && c.sector === contract.sector
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          ref={contentRef}
          className={`max-w-5xl max-h-[85vh] ${showLoadingPopup ? "overflow-hidden" : "overflow-y-auto"} px-10 py-10`}
        >
          <DialogHeader className="relative">
            <DialogDescription className="sr-only">Detail veřejné zakázky – {contract.title}</DialogDescription>
            <div className="absolute top-0 right-4 mt-4 2">
              <SecondaryButton
                onClick={handlePrint}
                className="min-w-[46px]"
              >
                <Printer className="h-4 w-4 ml-2" />
                Tisk
              </SecondaryButton>
              {/* Zavírací tlačítko tu ponechávaš vpravo hore, ak používaš default Dialog */}
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
                <section className="section-spacing">
                  <h3 className="text-base font-semibold text-slate-900 mb-2 uppercase tracking-wide">Popis zakázky</h3>
                  <p className="text-sm text-slate-800 whitespace-pre-line">{contract.description}</p>
                </section>
              )}

              <section className="section-spacing">
                <h3 className="text-base font-semibold text-slate-900 mb-2 uppercase tracking-wide">Základní informace</h3>
                <p><span className="font-medium">Odvětví:</span> {contract.sector}</p>
                <p><span className="font-medium">Hodnota zakázky:</span> {formatValue(contract.value)}</p>
                <p><span className="font-medium">Region:</span> {contract.region}</p>
                <p><span className="font-medium">Termín podání:</span> {new Date(contract.deadline).toLocaleDateString('cs-CZ')}</p>
                <p><span className="font-medium">Zadavatel:</span> {contract.contracting_authority}</p>
                {contract.administrator && (<p><span className="font-medium">Administrátor zakázky:</span> {contract.administrator}</p>)}
                {contract.supplier && (<p><span className="font-medium">Dodavatel:</span> {contract.supplier}</p>)}
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-3 mb-6">
                <PrimaryButton
                  onClick={() => {
                    setShowLoadingPopup("zadavatel");
                    setTimeout(() => {
                      setShowLoadingPopup(null);
                      setShowAnalysis(true);
                      onDeepSearch(contract.contracting_authority);
                      // Scroll after accordion content is rendered
                      setTimeout(() => {
                        const element = document.querySelector('[data-state="open"] [data-content="zadavatel-analysis"]');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }, 500);
                    }, 7000);
                  }}
                  className="w-[200px]"
                >
                  <Search className="h-4 w-4 ml-2" />
                  Prověřit zadavatele
                </PrimaryButton>
                {contract.administrator && (
                  <PrimaryButton
                    onClick={() => {
                      setShowLoadingPopup("administrator");
                      // Don't reset showAnalysis - keep previous analyses visible
                      setShowSupplierAnalysis(false);
                      setIsLoadingAdministrator(true);
                      setTimeout(() => {
                        setShowLoadingPopup(null);
                        setShowAdminAnalysis(true);
                        setIsLoadingAdministrator(false);
                        // Scroll to admin analysis section
                        setTimeout(() => {
                          const element = document.querySelector('[data-state="open"] [data-content="admin-analysis"]');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }, 500);
                        onDeepSearch(contract.administrator!);
                      }, 7000);
                    }}
                    className="w-[200px]"
                  >
                    <Search className="h-4 w-4 ml-2" />
                    Prověřit administrátora
                  </PrimaryButton>
                )}
                {contract.supplier && (
                  <PrimaryButton
                    onClick={() => {
                      setShowLoadingPopup("dodavatel");
                      setTimeout(() => {
                        setShowLoadingPopup(null);
                        setShowSupplierAnalysis(true);
                        scrollTo(dodavatelRef);
                      }, 7000);
                    }}
                    className="w-[200px]"
                  >
                    <Search className="h-4 w-4 ml-2" />
                    Prověřit dodavatele
                  </PrimaryButton>
                )}
              </div>

              {showSimilar && (
                <section className="section-spacing">
                  <Collapsible open={similarContractsOpen} onOpenChange={setSimilarContractsOpen}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full group">
                      <h3 className="text-base font-semibold text-slate-900 mb-4 uppercase tracking-wide">
                        Podobné zakázky ({filteredSimilarContracts?.length || 0})
                      </h3>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${similarContractsOpen ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent className="space-y-2">
                      {filteredSimilarContracts?.length > 0 ? (
                        <div className="w-full flex flex-col gap-4">
                          {filteredSimilarContracts.map((c) => (
                            <PublicContractCard
                              key={c.id}
                              contract={c}
                              onStatusChange={() => {}}
                              onMove={() => {}}
                              onDeepSearch={onDeepSearch}
                              mode="summary"
                              similarContracts={filteredSimilarContracts}
                              onOpenContractDetail={handleNestedContractOpen}
                            />
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-500">Nebyly nalezeny žádné podobné zakázky.</p>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                </section>
              )}
              
              <section className="section-spacing">
                <DocumentViewer contractId={contract.id} />
              </section>

              {contract.findings?.length > 0 && (
                <section className="section-spacing">
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
                <section className="section-spacing">
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
              {/* Move the "Navrhnout dotaz na zadavatele" button here */}
              <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-3 mb-6">
                <PrimaryButton
                  onClick={() => {
                    setShowGeneratedQuery((prev) => !prev);
                    setTimeout(() => scrollTo(generatedQueryRef), 100);
                  }}
                  className="min-w-[240px]"
                >
                  Navrhnout dotaz na zadavatele
                </PrimaryButton>

                <PrimaryButton
                  onClick={() => {
                    setShowTenderOriginality((prev) => !prev);
                    setTimeout(() => scrollTo(tenderUniquenessRef), 100);
                  }}
                  className="min-w-[240px]"
                >
                  Ověřit originalitu zadávacích podmínek
                </PrimaryButton>

                <PrimaryButton
                  onClick={() => {
                    setShowTenderAlignment((prev) => !prev);
                    setTimeout(() => scrollTo(tenderUniquenessRef), 100);
                  }}
                  className="min-w-[240px]"
                >
                  Ověřit soulad se zadávacími podmínkami
                </PrimaryButton>
              </div>
            </div>
          </div>

        <Accordion
          type="multiple"
          defaultValue={[
            "generated-query-00001079",
            "generated-query-00006628", 
            "zadavatel",
            "dodavatel",
            "administrator",
            "tender-uniqueness",
            "tender-alignment-00001079",
            "tender-alignment-00006628"
          ]}
        >
          {showGeneratedQuery && contract.id === '00001079' && (
            <div ref={generatedQueryRef}>
              <AccordionItem value="generated-query-00001079">
                <AccordionTrigger className="text-sm font-semibold text-slate-700 uppercase tracking-widest">
                  Návrh dotazu na zadavatele
                </AccordionTrigger>
                <AccordionContent className="bg-white border border-slate-300 rounded-lg shadow-sm p-6 text-sm text-slate-900 leading-relaxed">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-sm text-slate-800 space-y-2">
                    <p><strong>Předmět:</strong> Dotaz k veřejné zakázce č. 00001079 – kvalifikační podmínky</p>
                    <p><strong>Text e-mailu:</strong></p>
                    <p>
                      Vážený zadavateli,<br /><br />
                      v rámci kontroly veřejné zakázky <em>„Školní družina a školní klub ZŠ Hello, učebna informatiky, sanace spodní stavby"</em> bylo zjištěno, že technická kvalifikace byla nastavena způsobem, který vylučoval možnost jejího prokázání prostřednictvím jiných osob. Zakázku získala jediná firma bez konkurence.<br /><br />
                      V této souvislosti se na Vás obracíme s dotazem:<br />
                      „Z jakého důvodu jste ve veřejné zakázce vyloučili možnost, aby dodavatelé prokazovali kvalifikaci prostřednictvím jiných subjektů? Byla zvažována možnost, že tím může být omezena účast více dodavatelů?"<br /><br />
                      Děkujeme za Vaše vyjádření.
                    </p>
                  </div>
                  <div className="flex justify-end mt-2">
                    <SecondaryButton
                      onClick={() => {
                        const emailText = `Vážený zadavateli,

v rámci kontroly veřejné zakázky „Školní družina a školní klub ZŠ Hello, učebna informatiky, sanace spodní stavby" bylo zjištěno, že technická kvalifikace byla nastavena způsobem, který vylučoval možnost jejího prokázání prostřednictvím jiných osob. Zakázku získala jediná firma bez konkurence.

V této souvislosti se na Vás obracíme s dotazem:
„Z jakého důvodu jste ve veřejné zakázce vyloučili možnost, aby dodavatelé prokazovali kvalifikaci prostřednictvím jiných subjektů? Byla zvažována možnost, že tím může být omezena účast více dodavatelů?"

Děkujeme za Vaše vyjádření.`;

                        navigator.clipboard.writeText(emailText).then(() => {
                          alert("Text e-mailu byl zkopírován do schránky.");
                        });
                      }}
                      className="min-w-[240px]"
                    >
                      Zkopírovat text e-mailu
                    </SecondaryButton>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </div>
          )}

          {showGeneratedQuery && contract.id === '00006628' && (
            <div ref={generatedQueryRef}>
              <AccordionItem value="generated-query-00006628">
                <AccordionTrigger className="text-sm font-semibold text-slate-700 uppercase tracking-widest">
                  Návrh dotazu na zadavatele
                </AccordionTrigger>
                <AccordionContent className="bg-white border border-slate-300 rounded-lg shadow-sm p-6 text-sm text-slate-900 leading-relaxed">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-sm text-slate-800 space-y-2">
                    <p><strong>Předmět:</strong> Dotaz k veřejné zakázce č. 00006628 – kvalifikace a vícepráce</p>
                    <p><strong>Text e-mailu:</strong></p>
                    <p>
                      Vážený zadavateli,<br /><br />
                      v rámci kontroly veřejné zakázky <em>„Modernizace a přístavba Základní školy Brno, Antonínská"</em> bylo zjištěno, že kvalifikační podmínky nebyly jasně definovány a došlo také k navýšení ceny víceprací bez odpovídající kontroly.<br /><br />
                      V této souvislosti se na Vás obracíme s dotazem:<br />
                      „Jak byly nastaveny interní kontrolní mechanismy pro posouzení kvalifikačních požadavků a navýšení ceny víceprací? Jaká byla role administrátora při tvorbě zadávací dokumentace?"<br /><br />
                      Děkujeme za Vaše vyjádření.
                    </p>
                  </div>
                  <div className="flex justify-end mt-2">
                    <SecondaryButton
                      onClick={() => {
                        const emailText = `Vážený zadavateli,

v rámci kontroly veřejné zakázky „Modernizace a přístavba Základní školy Brno, Antonínská" bylo zjištěno, že kvalifikační podmínky nebyly jasně definovány a došlo také k navýšení ceny víceprací bez odpovídající kontroly.

V této souvislosti se na Vás obracíme s dotazem:
„Jak byly nastaveny interní kontrolní mechanismy pro posouzení kvalifikačních požadavků a navýšení ceny víceprací? Jaká byla role administrátora při tvorbě zadávací dokumentace?"

Děkujeme za Vaše vyjádření.`;

                        navigator.clipboard.writeText(emailText).then(() => {
                          alert("Text e-mailu byl zkopírován do schránky.");
                        });
                      }}
                      className="min-w-[240px]"
                    >
                      Zkopírovat text e-mailu
                    </SecondaryButton>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </div>
          )}
          
          {analysisResult && showAnalysis && (
            <div ref={zadavatelRef}>
              <AccordionItem value="zadavatel">
                <AccordionTrigger className="text-sm font-semibold text-slate-700 uppercase tracking-widest">
                  Analýza zadavatele
                </AccordionTrigger>
                <AccordionContent className="bg-white border border-slate-300 rounded-lg shadow-sm p-6 text-sm text-slate-900 leading-relaxed whitespace-pre-wrap" data-content="zadavatel-analysis">
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
                  <AccordionContent className="bg-white border border-slate-300 rounded-lg shadow-sm p-6 text-sm text-slate-900 leading-relaxed whitespace-pre-wrap" data-content="admin-analysis">
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


            {showTenderOriginality && contract.id === '00001079' && (
              <div ref={tenderUniquenessRef}>
                <AccordionItem value="tender-uniqueness">
                  <AccordionTrigger className="text-sm font-semibold text-slate-700 uppercase tracking-widest">
                    Ověření originality zadávacích podmínek
                  </AccordionTrigger>
                  <AccordionContent className="bg-white border border-slate-300 rounded-lg shadow-sm p-6 text-sm text-slate-900 leading-relaxed">
                    <div className="bg-green-50 border border-green-200 rounded-md p-4 text-sm text-slate-800 space-y-2">
                      <p><strong>Konkrétne požiadavky na technickú kvalifikáciu dodávateľa:</strong></p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>2× stavba občanské výstavby za provozu (min. 35 mil. Kč)</li>
                        <li>2× dřevostavba s lamelovými prvky a sendvičovým opláštěním (min. 5 mil. Kč)</li>
                        <li>2× ocelová konstrukce (min. 10 mil. Kč)</li>
                        <li>2× sanace zdiva (min. 1 mil. Kč)</li>
                        <li>2× sportovní podlaha s dřevěným povrchem (min. 1 mil. Kč)</li>
                      </ul>
                      <p><strong>Požiadavky na stavbyvedoucího a jeho zástupcov:</strong></p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Autorizovaný stavbyvedoucí s praxou na stavbe (min. 35 mil. Kč)</li>
                        <li>Zástupca s praxou na dřevostavbě alebo ocelovej konstrukci</li>
                        <li>Výkon stavbyvedoucího nemožno subdodávateľsky zabezpečiť</li>
                      </ul>
                      <p><strong>Ďalšie technické požiadavky:</strong></p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>3× lepené lamelové rámové vazníky (12,5 × 5,6 m)</li>
                        <li>16× ocelové příhradové vazníky (12 × 1,2 m)</li>
                        <li>24× sbíjené vazníky (12,5 × 2,2 m)</li>
                        <li>Zákaz dopravy medzi budovami</li>
                        <li>Povinné provizórne zastrešenie</li>
                        <li>Montáž sendvičového opláštenia</li>
                      </ul>
                      <p><strong>Celkový verdikt:</strong> Požiadavky sú náročné, ale nevedú k jednému dodávateľovi. Sú technicky splniteľné viacerými firmami.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </div>
            )}

            {showTenderAlignment && contract.id === '00001079' && (
              <div ref={tenderUniquenessRef}>
                <AccordionItem value="tender-alignment-00001079">
                  <AccordionTrigger className="text-sm font-semibold text-slate-700 uppercase tracking-widest">
                    Ověření souladu nabídky se zadávacími podmínkami
                  </AccordionTrigger>
                  <AccordionContent className="bg-white border border-slate-300 rounded-lg shadow-sm p-6 text-sm text-slate-900 leading-relaxed">
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm text-slate-800 space-y-2">
                      <p><strong>Kontrolované oblasti:</strong></p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Byla nabídka zhotovitele v plném rozsahu v souladu s požadavky uvedenými v technické specifikaci?</li>
                        <li>Obsahuje nabídka veškeré dokumenty a důkazy prokazující splnění kvalifikačních požadavků (včetně případného využití subdodavatelů)?</li>
                        <li>Byly veškeré přílohy, čestná prohlášení, certifikace a výkazy zpracovány ve struktuře předepsané zadávací dokumentací?</li>
                      </ul>
                    <p><strong>Výsledek kontroly:</strong> Analýza doložené nabídky neprokázala žádné nesoulady se zadávacími podmínkami. Technické požadavky i formální náležitosti byly naplněny. Nabídka je považována za úplnou a zadávací dokumentaci odpovídající. Z hlediska kontrolních mechanismů nebyly zjištěny pochybení, která by mohla ovlivnit transparentnost nebo rovnoprávnost zadávacího řízení.</p>                    </div>
                  </AccordionContent> 
                </AccordionItem>
              </div>
            )}

            {/* --- NOVÝ ODDÍL pro 00006628 --- */}
            {showTenderAlignment && contract.id === '00006628' && (
              <div ref={tenderUniquenessRef}>
                {/* Zde není tender-uniqueness AccordionItem, pouze tender-alignment */}
                <AccordionItem value="tender-alignment-00006628">
                  <AccordionTrigger className="text-sm font-semibold text-slate-700 uppercase tracking-widest">
                    Ověření souladu nabídky se zadávacími podmínkami
                  </AccordionTrigger>
                  <AccordionContent className="bg-white border border-slate-300 rounded-lg shadow-sm p-6 text-sm text-slate-900 leading-relaxed">
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm text-slate-800 space-y-2">
                      <p><strong>Kontrolované oblasti:</strong></p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Byla nabídka v souladu s technickými a kvalifikačními požadavky definovanými v zadávací dokumentaci?</li>
                        <li>Odpovídá rozsah provedených víceprací právnímu rámci a byly tyto změny adekvátně zdokumentovány?</li>
                        <li>Existuje srozumitelná návaznost mezi původní smlouvou, jejími dodatky a realizovanými pracemi?</li>
                      </ul>
                    <p><strong>Výsledek kontroly:</strong> V průběhu kontroly byly zjištěny nesrovnalosti v oblasti víceprací. Došlo k navýšení ceny, které nebylo dostatečně odůvodněno a formálně doloženo příslušnými dodatky. Tento postup může vést ke snížení transparentnosti zadávacího procesu. Doporučujeme provést detailní audit všech změn oproti původní smlouvě a přezkoumat, zda byly dodrženy principy hospodárnosti a přiměřenosti.</p></div>
                  </AccordionContent>
                </AccordionItem>
              </div>
            )}
          </Accordion>
        </DialogContent>
      </Dialog>

      {/* Nested dialog for similar contracts */}
      {nestedContract && (
        <ContractDetailDialog
          contract={nestedContract}
          isOpen={true}
          onClose={handleNestedContractClose}
          onDeepSearch={onDeepSearch}
          similarContracts={similarContracts}
          onOpenContractDetail={handleNestedContractOpen}
        />
      )}

      {/* Loading overlay rendered as portal */}
      {showLoadingPopup && createPortal(
        <div className="fixed inset-0 z-[99999] bg-white/70 backdrop-blur-md flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center justify-center border border-slate-200">
            <img src="/CRR-gif-optimized.gif" alt="Načítání..." className="w-24 h-24 mb-4" />
            <p className="text-sm text-slate-600 text-center">
              Načítám analýzu{' '}
              {showLoadingPopup === "zadavatel"
                ? "zadavatele"
                : showLoadingPopup === "dodavatel"
                ? "dodavatele"
                : "administrátora"}
              …
            </p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};