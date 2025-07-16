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
  ChevronDown
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { DocumentCard } from './DocumentCard';

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

  const handleViewDocument = (doc: DocumentFile) => {
    setSelectedDocument(doc);
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
        <div className="fixed inset-0 z-[10060] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-3">
                {getFileIcon(selectedDocument.file_type)}
                <div>
                  <h3 className="font-medium text-slate-900">{selectedDocument.name}</h3>
                  <p className="text-sm text-slate-500">
                    {formatFileSize(selectedDocument.file_size)} • {new Date(selectedDocument.uploaded_at).toLocaleDateString('sk-SK')}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDocument(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 p-4 overflow-auto bg-gray-50">
              {selectedDocument.file_type.includes('pdf') ? (
                <div className="text-center py-8">
                  <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">PDF dokument: {selectedDocument.name}</p>
                  <p className="text-sm text-gray-500">
                    V reálnej aplikácii by sa tu zobrazil PDF viewer
                  </p>
                </div>
              ) : selectedDocument.file_type.includes('spreadsheet') ? (
                <div className="text-center py-8">
                  <FileSpreadsheet className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">Excel súbor: {selectedDocument.name}</p>
                  <p className="text-sm text-gray-500">
                    V reálnej aplikácii by sa tu zobrazil spreadsheet viewer
                  </p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <File className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">Dokument: {selectedDocument.name}</p>
                  <p className="text-sm text-gray-500">
                    Preview nie je k dispozícii pre tento typ súboru
                  </p>
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
                <Button onClick={() => setSelectedDocument(null)}>
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
