import React from 'react';
import { CheckCircle2, AlertTriangle, Target } from 'lucide-react';

export default function MetricsDashboard() {
  const readinessScore = 68;
  const currentSkills = ['Python', 'SQL', 'Data Analysis', 'Git', 'Machine Learning (Basic)'];
  const skillsGap = ['PyTorch/TensorFlow', 'Model Deployment', 'Deep Learning', 'MLOps'];

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 w-full mb-8 border border-white/10">
      <h3 className="text-xl font-bold mb-6 flex items-center">
        <Target className="mr-2 text-accent-blue w-6 h-6" />
        Role <span className="text-gradient ml-2">Readiness & Skills</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Readiness Score */}
        <div className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-xl border border-white/10 hover-lift transition-all">
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Circular progress visualization */}
            <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]" viewBox="0 0 36 36">
              <path
                className="text-white/10"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="text-accent-blue"
                strokeDasharray={`${readinessScore}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-white">{readinessScore}%</span>
            </div>
          </div>
          <p className="mt-4 font-medium text-primary">Readiness Score</p>
          <p className="text-xs text-secondary text-center mt-1">Based on targeted role requirements</p>
        </div>

        {/* Current Skills */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover-lift transition-all">
          <h4 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4 flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400" />
            Verified Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {currentSkills.map((skill, index) => (
              <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Skills Gap */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover-lift transition-all">
          <h4 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2 text-amber-400" />
            Skills to Acquire
          </h4>
          <div className="flex flex-wrap gap-2">
            {skillsGap.map((skill, index) => (
              <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
