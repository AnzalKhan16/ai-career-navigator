import React, { useState } from 'react';
import API from '../api/axios';
import { Loader2, Zap, Briefcase, Target } from 'lucide-react';

const RoadmapGenerator = ({ onGenerateSuccess }) => {
  const [currentRole, setCurrentRole] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentRole || !targetRole) {
      setError('Please fill in both fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await API.post('/roadmaps', { currentRole, targetRole });
      setCurrentRole('');
      setTargetRole('');
      if (onGenerateSuccess) {
        onGenerateSuccess();
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to generate roadmap via AI.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full text-left">
      <h3 className="text-2xl font-bold mb-2">Roadmap Generator</h3>
      <p className="text-secondary mb-6">Let our AI build a customized step-by-step path to your dream role.</p>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">Current Role</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Briefcase className="h-5 w-5 text-secondary" />
            </div>
            <input
              type="text"
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              disabled={loading}
              className="w-full bg-white/5 border border-border rounded-lg py-3 pl-10 pr-4 text-primary focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors"
              placeholder="e.g. Junior Frontend Developer"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-2">Target Role</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Target className="h-5 w-5 text-secondary" />
            </div>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              disabled={loading}
              className="w-full bg-white/5 border border-border rounded-lg py-3 pl-10 pr-4 text-primary focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors"
              placeholder="e.g. Senior Full Stack Engineer"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold py-3 px-4 rounded-lg hover:shadow-lg hover:shadow-accent-glow/40 transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover-lift mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating via AI...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              Generate My Roadmap
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default RoadmapGenerator;
