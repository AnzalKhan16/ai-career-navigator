import React from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';

const RoadmapDisplay = ({ roadmap, onBack }) => {
  if (!roadmap) return null;

  return (
    <div className="w-full text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-secondary hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Roadmaps
      </button>

      <div className="glass-card p-8 rounded-2xl border border-white/10">
        <div className="border-b border-white/10 pb-6 mb-6">
          <h2 className="text-3xl font-bold mb-4 flex items-center flex-wrap gap-3">
            <span className="text-gradient capitalize">{roadmap.currentRole}</span>
            <span className="text-secondary">➔</span>
            <span className="text-gradient capitalize">{roadmap.targetRole}</span>
          </h2>
          
          <div className="flex gap-4 text-sm text-secondary">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>Generated on {new Date(roadmap.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-primary/90 leading-relaxed font-sans bg-white/5 p-6 rounded-xl border border-white/5">
            {roadmap.roadmapContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapDisplay;
