import { Upload, FileText, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const LabReportUpload = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Upload Lab Reports</h2>
        <p className="text-medical-gray-dark text-lg">
          Upload your recent lab reports for personalized health insights
        </p>
      </div>

      <Card className="p-8 bg-white border-2 border-dashed border-medical-gray hover:border-medical-blue transition-smooth">
        {!uploadedFile ? (
          <div
            className={`text-center py-12 transition-smooth ${
              isDragOver ? "bg-medical-blue-light" : ""
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
          >
            <Upload className="h-16 w-16 text-medical-blue mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Drop your lab reports here
            </h3>
            <p className="text-medical-gray-dark mb-6">
              Supports PDF, JPG, PNG files up to 10MB
            </p>
            
            <label htmlFor="file-upload">
              <Button
                type="button"
                className="bg-medical-blue hover:bg-medical-blue-dark text-white px-8 py-3 rounded-full font-semibold shadow-medical transition-smooth"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                Choose Files
              </Button>
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileInput}
            />
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              File Uploaded Successfully!
            </h3>
            <div className="flex items-center justify-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-medical-blue" />
              <span className="text-medical-gray-dark">{uploadedFile.name}</span>
            </div>
            <Button
              variant="outline"
              onClick={() => setUploadedFile(null)}
              className="text-medical-blue border-medical-blue hover:bg-medical-blue-light"
            >
              Upload Another File
            </Button>
          </div>
        )}
      </Card>
    </section>
  );
};