import { useState } from "react";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const RFPUpload = () => {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setUploadStatus('idle');
    } else {
      toast({
        title: "Invalid File Type",
        description: "Please select a PDF file.",
        variant: "destructive",
      });
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setUploadStatus('uploading');
    
    // Simulate upload process
    setTimeout(() => {
      setUploadStatus('success');
      toast({
        title: "Upload Successful",
        description: "RFP document has been processed and analyzed.",
      });
    }, 2000);
  };

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case 'uploading':
        return <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />;
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-6 w-6 text-destructive" />;
      default:
        return <Upload className="h-6 w-6 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Upload RFP Document</span>
          </CardTitle>
          <CardDescription>
            Upload your RFP PDF document for AI-powered analysis and evaluation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
              <div className="flex flex-col items-center space-y-4">
                {getStatusIcon()}
                
                {uploadStatus === 'idle' && (
                  <>
                    <div>
                      <p className="text-lg font-medium">Select RFP Document</p>
                      <p className="text-sm text-muted-foreground">PDF files only, up to 20MB</p>
                    </div>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button variant="outline" className="cursor-pointer">
                        Browse Files
                      </Button>
                    </label>
                  </>
                )}
                
                {uploadStatus === 'uploading' && (
                  <div>
                    <p className="text-lg font-medium">Processing Document...</p>
                    <p className="text-sm text-muted-foreground">Analyzing with Azure OpenAI</p>
                  </div>
                )}
                
                {uploadStatus === 'success' && (
                  <div>
                    <p className="text-lg font-medium text-green-600">Upload Complete!</p>
                    <p className="text-sm text-muted-foreground">Document ready for department review</p>
                  </div>
                )}
              </div>
            </div>
            
            {selectedFile && uploadStatus === 'idle' && (
              <div className="bg-secondary p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5" />
                    <div>
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button onClick={handleUpload} className="bg-gradient-primary">
                    Process with AI
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {uploadStatus === 'success' && (
        <Card className="shadow-card border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Analysis Complete</CardTitle>
            <CardDescription className="text-green-700">
              Your RFP has been processed and is now available in the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">15</p>
                <p className="text-sm text-green-700">Key Requirements</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">3</p>
                <p className="text-sm text-green-700">Critical Deadlines</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">8</p>
                <p className="text-sm text-green-700">Compliance Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};