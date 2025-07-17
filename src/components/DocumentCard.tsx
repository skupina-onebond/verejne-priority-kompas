
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  Download, 
  Eye, 
  File,
  FileSpreadsheet,
  Image,
} from "lucide-react";

interface DocumentFile {
  id: string;
  name: string;
  file_type: string;
  file_size: number;
  uploaded_at: string;
  file_path: string;
  contract_id: string;
}

interface DocumentCardProps {
  document: DocumentFile;
  onView: (doc: DocumentFile) => void;
  onDownload: (doc: DocumentFile) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ 
  document, 
  onView, 
  onDownload 
}) => {
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

  return (
    <Card className="border border-slate-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="text-[#215197] flex-shrink-0">
              {getFileIcon(document.file_type)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-slate-900 truncate">{document.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {formatFileSize(document.file_size)}
                </Badge>
                <span className="text-xs text-slate-500">
                  {new Date(document.uploaded_at).toLocaleDateString('sk-SK')}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(document)}
              className="text-[#215197] border-[#215197] hover:bg-[#215197]/10"
            >
              <Eye className="h-4 w-4 mr-1" />
              Zobrazit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDownload(document)}
              className="text-[#215197] border-[#215197] hover:bg-[#215197]/10"
            >
              <Download className="h-4 w-4 mr-1" />
              Stáhnout
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
