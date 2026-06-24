import React, { useState } from 'react';
import { UploadCloud, File, X, ChevronRight, Loader2 } from 'lucide-react';
import API from '../api/axios';

export default function UploadScreen({ onComplete }) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [targetRole, setTargetRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handleAnalyze = async () => {
    if (!file || !targetRole) {
      setError('Please provide both a resume and a target role.');
      return;
    }
    
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('targetRole', targetRole);

    try {
      const res = await API.post('/resumes/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onComplete(res.data.analysis);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to analyze resume via AI.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Resume <span className="text-gradient">Analysis</span></h2>
        <p className="text-secondary text-lg">
          Upload your resume and let our AI compare your skills against your dream role.
        </p>
      </div>

      <div className="glass-card p-8 rounded-2xl border border-white/10">
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Upload Zone */}
        <div 
          className={`relative border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center transition-all ${
            isDragging ? 'border-accent-blue bg-accent-blue/10' : 'border-white/20 hover:border-white/40 bg-white/5'
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
            disabled={loading}
          />
          
          {file ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-accent-blue/20 text-accent-blue rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <File size={32} />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-primary">{file.name}</p>
                <p className="text-sm text-secondary">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button 
                onClick={(e) => { e.preventDefault(); setFile(null); }}
                className="mt-4 flex items-center text-sm font-medium text-red-400 hover:text-red-300 transition-colors z-10"
                disabled={loading}
              >
                <X size={16} className="mr-1" /> Remove File
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${isDragging ? 'bg-accent-blue/20 text-accent-blue' : 'bg-white/10 text-secondary'}`}>
                <UploadCloud size={32} />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-primary">
                  <span className="text-accent-blue cursor-pointer font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-sm text-secondary mt-2">PDF, DOC, or DOCX (MAX. 5MB)</p>
              </div>
            </div>
          )}
        </div>

        {/* Target Role Selection */}
        <div className="mt-8">
          <label htmlFor="role" className="block text-sm font-medium text-secondary mb-2">
            Target Role for Analysis
          </label>
          <input
            id="role"
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            disabled={loading}
            className="w-full bg-white/5 border border-border rounded-lg py-3 px-4 text-primary focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors"
            placeholder="e.g. Senior Machine Learning Engineer"
          />
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <button
            disabled={!file || !targetRole || loading}
            onClick={handleAnalyze}
            className="w-full bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold py-3 px-4 rounded-lg hover:shadow-lg hover:shadow-accent-glow/40 transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover-lift"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing Resume...
              </>
            ) : (
              <>
                Analyze Resume via AI
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
