import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  Download, 
  Eye, 
  File,
  FileSpreadsheet,
  Image,
  X,
  ChevronDown,
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { DocumentCard } from './DocumentCard';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface DocumentFile {
  id: string;
  name: string;
  file_type: string;
  file_size: number;
  uploaded_at: string;
  file_path: string;
  contract_id: string;
}

interface DocumentViewerProps {
  contractId: string;
  documents?: DocumentFile[];
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ 
  contractId, 
  documents = [] 
}) => {
  const [selectedDocument, setSelectedDocument] = useState<DocumentFile | null>(null);
  const [contractDocuments, setContractDocuments] = useState<DocumentFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfLoading, setPdfLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchDocuments();
  }, [contractId]);

  // Refresh documents when the component mounts or contractId changes
  useEffect(() => {
    const intervalId = setInterval(fetchDocuments, 30000); // Refresh every 30 seconds
    return () => clearInterval(intervalId);
  }, [contractId]);

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('contract_id', contractId)
        .order('uploaded_at', { ascending: false });

      if (error) {
        console.error('Error fetching documents:', error);
        toast({
          title: "Chyba",
          description: "Nepodarilo sa načítať dokumenty",
          variant: "destructive"
        });
      } else {
        setContractDocuments(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <FileText className="h-4 w-4" />;
    if (type.includes('spreadsheet') || type.includes('excel')) return <FileSpreadsheet className="h-4 w-4" />;
    if (type.includes('image')) return <Image className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const handleViewDocument = async (doc: DocumentFile) => {
    setSelectedDocument(doc);
    setPageNumber(1);
    setNumPages(null);
    setDocumentUrl(null);
    setPdfLoading(true);

    try {
      const { data, error } = await supabase.storage
        .from('contract-documents')
        .download(doc.file_path);

      if (error) {
        console.error('Error loading document:', error);
        toast({
          title: "Chyba",
          description: "Nepodarilo sa načítať dokument",
          variant: "destructive"
        });
        setPdfLoading(false);
        return;
      }

      const url = URL.createObjectURL(data);
      setDocumentUrl(url);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Chyba",
        description: "Nepodarilo sa načítať dokument",
        variant: "destructive"
      });
    } finally {
      setPdfLoading(false);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('PDF load error:', error);
    toast({
      title: "Chyba",
      description: "Nepodarilo sa načítať PDF dokument",
      variant: "destructive"
    });
  };

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => numPages ? Math.min(prev + 1, numPages) : prev);
  };

  const getOfficeViewerUrl = (doc: DocumentFile) => {
    const publicUrl = supabase.storage
      .from('contract-documents')
      .getPublicUrl(doc.file_path).data.publicUrl;
    
    if (doc.file_type.includes('word') || doc.file_type.includes('docx')) {
      return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(publicUrl)}`;
    }
    if (doc.file_type.includes('excel') || doc.file_type.includes('xlsx') || doc.file_type.includes('spreadsheet')) {
      return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(publicUrl)}`;
    }
    if (doc.file_type.includes('powerpoint') || doc.file_type.includes('pptx')) {
      return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(publicUrl)}`;
    }
    
    // Fallback to Google Docs Viewer
    return `https://docs.google.com/viewer?url=${encodeURIComponent(publicUrl)}&embedded=true`;
  };

  const handleDownload = async (doc: DocumentFile) => {
    try {
      const { data, error } = await supabase.storage
        .from('contract-documents')
        .download(doc.file_path);

      if (error) {
        console.error('Error downloading file:', error);
        toast({
          title: "Chyba",
          description: "Nepodarilo sa stiahnuť súbor",
          variant: "destructive"
        });
        return;
      }

      // Create download link
      const url = URL.createObjectURL(data);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = doc.name;
      window.document.body.appendChild(a);
      a.click();
      window.document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Úspech",
        description: `Súbor ${doc.name} bol stiahnutý`,
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Chyba",
        description: "Nepodarilo sa stiahnuť súbor",
        variant: "destructive"
      });
    }
  };

  const displayDocuments = contractDocuments.length > 0 ? contractDocuments : documents;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900 uppercase tracking-wide">
            Dokumenty
          </h3>
        </div>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">Načítavam dokumenty...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-slate-900 uppercase tracking-wide">
            Příslušná dokumentace ({displayDocuments.length})
          </h3>
          {displayDocuments.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 h-6 w-6"
            >
              <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </Button>
          )}
        </div>
      </div>

      {displayDocuments.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">Žiadne dokumenty nie sú k dispozícii</p>
            <p className="text-sm text-gray-400 mt-1">Dokumenty budú nahrané administrátorom</p>
          </CardContent>
        </Card>
      ) : (
        isExpanded && (
          <div className="space-y-3">
            {displayDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onView={handleViewDocument}
                onDownload={handleDownload}
              />
            ))}
          </div>
        )
      )}

      {/* Document Viewer Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[95vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-3 sm:p-4 border-b bg-white">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                {getFileIcon(selectedDocument.file_type)}
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-slate-900 truncate">{selectedDocument.name}</h3>
                  <p className="text-sm text-slate-500">
                    {formatFileSize(selectedDocument.file_size)} • {new Date(selectedDocument.uploaded_at).toLocaleDateString('sk-SK')}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (documentUrl) {
                    URL.revokeObjectURL(documentUrl);
                  }
                  setSelectedDocument(null);
                  setDocumentUrl(null);
                }}
                className="ml-2 flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-hidden bg-gray-50">
              {selectedDocument.file_type.includes('pdf') ? (
                <div className="h-full flex flex-col">
                  {pdfLoading ? (
                    <div className="flex-1 flex items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                      <span className="ml-2 text-gray-600">Načítavam PDF...</span>
                    </div>
                  ) : documentUrl ? (
                    <>
                      {/* PDF Navigation */}
                      {numPages && numPages > 1 && (
                        <div className="flex items-center justify-between p-4 bg-white border-b">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={goToPrevPage}
                            disabled={pageNumber <= 1}
                          >
                            Predchádzajúca
                          </Button>
                          <span className="text-sm text-gray-600">
                            Strana {pageNumber} z {numPages}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={goToNextPage}
                            disabled={pageNumber >= (numPages || 1)}
                          >
                            Ďalšia
                          </Button>
                        </div>
                      )}
                      
                      {/* PDF Document */}
                      <div className="flex-1 overflow-auto bg-white">
                        <div className="flex justify-center p-4 min-h-full">
                          <Document
                            file={documentUrl}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadError={onDocumentLoadError}
                            loading={
                              <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                                <span className="ml-2">Načítavam PDF...</span>
                              </div>
                            }
                            className="shadow-lg"
                          >
                            <Page
                              pageNumber={pageNumber}
                              scale={1.1}
                              renderTextLayer={true}
                              renderAnnotationLayer={true}
                              className="shadow-md"
                            />
                          </Document>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600">Nepodarilo sa načítať PDF dokument</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : selectedDocument.file_type.includes('word') || 
                  selectedDocument.file_type.includes('docx') ||
                  selectedDocument.file_type.includes('excel') || 
                  selectedDocument.file_type.includes('xlsx') ||
                  selectedDocument.file_type.includes('spreadsheet') ||
                  selectedDocument.file_type.includes('powerpoint') ||
                  selectedDocument.file_type.includes('pptx') ? (
                <div className="h-full">
                  <iframe
                    src={getOfficeViewerUrl(selectedDocument)}
                    className="w-full h-full border-0"
                    title={`Viewer: ${selectedDocument.name}`}
                    onError={() => {
                      toast({
                        title: "Chyba",
                        description: "Nepodarilo sa načítať dokument vo vieweri",
                        variant: "destructive"
                      });
                    }}
                  />
                </div>
              ) : selectedDocument.file_type.includes('image') ? (
                <div className="p-4 flex justify-center">
                  <img 
                    src={documentUrl || ''}
                    alt={selectedDocument.name}
                    className="max-w-full max-h-full object-contain"
                    onError={() => {
                      toast({
                        title: "Chyba", 
                        description: "Nepodarilo sa načítať obrázok",
                        variant: "destructive"
                      });
                    }}
                  />
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center">
                    <File className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">Dokument: {selectedDocument.name}</p>
                    <p className="text-sm text-gray-500 mb-4">
                      Nie je k dispozícii náhľad pre tento typ súboru
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => handleDownload(selectedDocument)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Stiahnuť súbor
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t bg-gray-50">
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handleDownload(selectedDocument)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Stáhnout
                </Button>
                <Button onClick={() => {
                  if (documentUrl) {
                    URL.revokeObjectURL(documentUrl);
                  }
                  setSelectedDocument(null);
                  setDocumentUrl(null);
                }}>
                  Zavřít
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
