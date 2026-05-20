import React, { useState } from 'react';
import { UploadCloud, File, X, ChevronRight } from 'lucide-react';

export default function UploadScreen({ onComplete }) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [targetRole, setTargetRole] = useState('data-scientist');

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full py-12 px-4 sm:px-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Upload Your Resume</h2>
        <p className="mt-4 text-lg leading-6 text-secondary">
          Let's analyze your skills and build a personalized roadmap for your dream AI role.
        </p>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm border border-border p-6 sm:p-10 transition-all">
        {/* Upload Zone */}
        <div 
          className={`relative border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center transition-colors ${
            isDragging ? 'border-accent bg-accent/5' : 'border-border hover:border-secondary/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            onChange={handleFileInput}
            accept=".pdf,.doc,.docx"
          />
          
          {file ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-blue-50 text-accent rounded-full flex items-center justify-center">
                <File size={32} />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-primary">{file.name}</p>
                <p className="text-sm text-secondary">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button 
                onClick={(e) => { e.preventDefault(); setFile(null); }}
                className="mt-4 flex items-center text-sm font-medium text-red-500 hover:text-red-700 transition-colors z-10"
              >
                <X size={16} className="mr-1" /> Remove File
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${isDragging ? 'bg-accent/10 text-accent' : 'bg-gray-50 text-secondary'}`}>
                <UploadCloud size={32} />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-primary">
                  <span className="text-accent cursor-pointer">Click to upload</span> or drag and drop
                </p>
                <p className="text-sm text-secondary mt-1">PDF, DOC, or DOCX (MAX. 5MB)</p>
              </div>
            </div>
          )}
        </div>

        {/* Target Role Selection */}
        <div className="mt-8">
          <label htmlFor="role" className="block text-sm font-medium text-primary mb-2">
            Target AI Role
          </label>
          <select
            id="role"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="block w-full pl-3 pr-10 py-3 text-base border-border focus:outline-none focus:ring-accent focus:border-accent sm:text-sm rounded-lg border bg-gray-50 transition-colors cursor-pointer"
          >
            <option value="data-scientist">Data Scientist</option>
            <option value="ml-engineer">Machine Learning Engineer</option>
            <option value="ai-product-manager">AI Product Manager</option>
            <option value="data-engineer">Data Engineer</option>
            <option value="research-scientist">AI Research Scientist</option>
          </select>
        </div>

        {/* Action Button */}
        <div className="mt-10">
          <button
            disabled={!file}
            onClick={() => onComplete(targetRole)}
            className={`w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white transition-all ${
              file ? 'bg-accent hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-accent' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Generate Roadmap
            <ChevronRight className="ml-2" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
