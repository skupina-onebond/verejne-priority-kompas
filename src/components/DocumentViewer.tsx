
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  Download, 
  Eye, 
  Upload, 
  File,
  FileSpreadsheet,
  Image,
  X
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  url?: string;
}

interface DocumentViewerProps {
  contractId: string;
  documents?: Document[];
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ 
  contractId, 
  documents = [] 
}) => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  // Mock dokumenty pro demonstraci
  const mockDocuments: Document[] = documents.length > 0 ? documents : [
    {
      id: '1',
      name: 'Zadávací dokumentace.pdf',
      type: 'application/pdf',
      size: 2485760, // 2.4 MB
      uploadDate: '2024-03-15',
      url: '/placeholder-document.pdf'
    },
    {
      id: '2',
      name: 'Smlouva o dílo.pdf',
      type: 'application/pdf',
      size: 1024000, // 1 MB
      uploadDate: '2024-04-02',
      url: '/placeholder-contract.pdf'
    },
    {
      id: '3',
      name: 'Rozpočet.xlsx',
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      size: 512000, // 500 KB
      uploadDate: '2024-04-01',
      url: '/placeholder-budget.xlsx'
    }
  ];

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

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
  };

  const handleDownload = (document: Document) => {
    // V reálnej aplikácii by tu bol skutočný download
    console.log(`Sťahujem dokument: ${document.name}`);
  };

  const handleUpload = () => {
    // V reálnej aplikácii by tu bol file picker
    console.log('Nahrávam nový dokument...');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900 uppercase tracking-wide">
          Dokumenty ({mockDocuments.length})
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleUpload}
          className="text-[#215197] border-[#215197] hover:bg-[#215197]/10"
        >
          <Upload className="h-4 w-4 mr-2" />
          Nahrať dokument
        </Button>
      </div>

      {mockDocuments.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">Žiadne dokumenty nie sú k dispozícii</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {mockDocuments.map((document) => (
            <Card key={document.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="text-[#215197]">
                      {getFileIcon(document.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {document.name}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                        <span>{formatFileSize(document.size)}</span>
                        <span>{new Date(document.uploadDate).toLocaleDateString('sk-SK')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDocument(document)}
                      className="text-[#215197] hover:bg-[#215197]/10"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(document)}
                      className="text-[#215197] hover:bg-[#215197]/10"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Document Viewer Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 z-[10060] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-3">
                {getFileIcon(selectedDocument.type)}
                <div>
                  <h3 className="font-medium text-slate-900">{selectedDocument.name}</h3>
                  <p className="text-sm text-slate-500">
                    {formatFileSize(selectedDocument.size)} • {new Date(selectedDocument.uploadDate).toLocaleDateString('sk-SK')}
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
              {selectedDocument.type.includes('pdf') ? (
                <div className="text-center py-8">
                  <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">PDF dokument: {selectedDocument.name}</p>
                  <p className="text-sm text-gray-500">
                    V reálnej aplikácii by sa tu zobrazil PDF viewer
                  </p>
                </div>
              ) : selectedDocument.type.includes('spreadsheet') ? (
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
                  Stiahnuť
                </Button>
                <Button onClick={() => setSelectedDocument(null)}>
                  Zavrieť
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
