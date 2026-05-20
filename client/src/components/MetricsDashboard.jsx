import React from 'react';
import { CheckCircle2, AlertTriangle, Target } from 'lucide-react';

export default function MetricsDashboard() {
  const readinessScore = 68;
  const currentSkills = ['Python', 'SQL', 'Data Analysis', 'Git', 'Machine Learning (Basic)'];
  const skillsGap = ['PyTorch/TensorFlow', 'Model Deployment', 'Deep Learning', 'MLOps'];

  return (
    <div className="bg-surface rounded-2xl shadow-sm border border-border p-6 sm:p-8 w-full mb-8">
      <h3 className="text-xl font-bold text-primary mb-6 flex items-center">
        <Target className="mr-2 text-accent" />
        Role Readiness & Skills Analysis
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Readiness Score */}
        <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border border-border">
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Simple CSS circular progress visualization */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-200"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="text-accent"
                strokeDasharray={`${readinessScore}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-primary">{readinessScore}%</span>
            </div>
          </div>
          <p className="mt-4 font-medium text-primary">Readiness Score</p>
          <p className="text-xs text-secondary text-center mt-1">Based on requirements for Machine Learning Engineer</p>
        </div>

        {/* Current Skills */}
        <div className="bg-white p-6 rounded-xl border border-border">
          <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
            Verified Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {currentSkills.map((skill, index) => (
              <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Skills Gap */}
        <div className="bg-white p-6 rounded-xl border border-border">
          <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2 text-amber-500" />
            Skills to Acquire
          </h4>
          <div className="flex flex-wrap gap-2">
            {skillsGap.map((skill, index) => (
              <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-50 text-amber-700 border border-amber-200">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
