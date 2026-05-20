import React from 'react';
import { User, Mail, Target, Award, Clock, ChevronRight, BookOpen, CheckCircle } from 'lucide-react';

export default function ProfileView({ userData }) {
  // Mock fallback data if no user context is passed
  const user = userData || {
    name: "Anzal",
    email: "anzal@example.com",
    targetRole: "Machine Learning Engineer",
    avatar: "A",
    skills: [
      "Python", "SQL", "Data Analysis", "Git", "React", "JavaScript", 
      "TensorFlow", "Pandas", "Scikit-Learn", "Docker", "AWS"
    ],
    journeys: [
      {
        id: 1,
        title: "Deep Learning Foundations to Advanced CNNs",
        target: "Machine Learning Engineer",
        progress: 50,
        currentWeek: 2,
        totalWeeks: 4,
        lastActive: "2 hours ago",
        status: "active"
      },
      {
        id: 2,
        title: "Data Engineering Pipeline Mastery",
        target: "Data Engineer",
        progress: 100,
        currentWeek: 6,
        totalWeeks: 6,
        lastActive: "1 month ago",
        status: "completed"
      }
    ]
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. User Header */}
      <div className="bg-surface rounded-2xl shadow-sm border border-border p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden">
        {/* Subtle decorative background blob */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex-shrink-0 relative">
          <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-gradient-to-br from-blue-100 to-accent/20 border-4 border-white shadow-md flex items-center justify-center">
            <span className="text-4xl sm:text-5xl font-bold text-accent">{user.avatar}</span>
          </div>
          <div className="absolute bottom-1 right-1 h-6 w-6 bg-green-500 border-2 border-white rounded-full" title="Online"></div>
        </div>
        
        <div className="flex-1 text-center md:text-left z-10 pt-2">
          <h1 className="text-3xl font-bold text-primary tracking-tight">{user.name}</h1>
          
          <div className="mt-3 flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-6 text-sm text-secondary">
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-1.5" />
              {user.email}
            </div>
            <div className="flex items-center text-accent font-medium bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              <Target className="w-4 h-4 mr-1.5" />
              Target Role: {user.targetRole}
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary">{user.journeys.length}</span>
              <span className="text-xs uppercase tracking-wider text-secondary font-semibold">Total Journeys</span>
            </div>
            <div className="w-px h-10 bg-border mx-2 hidden md:block"></div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary">{user.skills.length}</span>
              <span className="text-xs uppercase tracking-wider text-secondary font-semibold">Verified Skills</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 2. Extracted Skills Vault */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface rounded-2xl shadow-sm border border-border p-6 h-full">
            <h3 className="text-lg font-bold text-primary flex items-center mb-5 pb-4 border-b border-gray-100">
              <Award className="mr-2 text-accent" />
              Extracted Skills Vault
            </h3>
            
            <div className="flex flex-wrap gap-2.5">
              {user.skills.map((skill, index) => {
                // Alternate between blue and green pill styles for visual interest
                const isPrimary = index % 3 === 0;
                return (
                  <span 
                    key={index} 
                    className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-transform hover:scale-105 cursor-default ${
                      isPrimary 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                        : 'bg-green-50 text-green-700 border border-green-200'
                    }`}
                  >
                    {skill}
                  </span>
                );
              })}
            </div>
            {user.skills.length === 0 && (
              <p className="text-sm text-secondary italic text-center py-8">No skills extracted yet. Upload your resume to populate the vault!</p>
            )}
          </div>
        </div>

        {/* 3. History Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface rounded-2xl shadow-sm border border-border p-6 sm:p-8">
            <h3 className="text-lg font-bold text-primary flex items-center mb-6 pb-4 border-b border-gray-100">
              <BookOpen className="mr-2 text-accent" />
              Your Active Learning Journeys
            </h3>

            <div className="space-y-6">
              {user.journeys.map((journey) => (
                <div key={journey.id} className="group relative border border-border rounded-xl p-5 hover:shadow-md transition-shadow bg-white">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                    <div>
                      <h4 className="text-base font-bold text-primary">{journey.title}</h4>
                      <p className="text-sm text-secondary mt-1 flex items-center">
                        <Target className="w-3.5 h-3.5 mr-1" /> Target: {journey.target}
                      </p>
                    </div>
                    {journey.status === 'completed' ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        <CheckCircle className="w-3.5 h-3.5 mr-1" /> Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                        <Clock className="w-3.5 h-3.5 mr-1" /> In Progress
                      </span>
                    )}
                  </div>

                  <div className="mb-2 flex justify-between items-end">
                    <span className="text-sm font-semibold text-primary">
                      Week {journey.currentWeek} <span className="text-secondary font-normal">of {journey.totalWeeks} Complete</span>
                    </span>
                    <span className="text-sm font-bold text-accent">{journey.progress}%</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden border border-gray-200/50">
                    <div 
                      className={`h-2.5 rounded-full ${journey.status === 'completed' ? 'bg-green-500' : 'bg-accent'}`}
                      style={{ width: `${journey.progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-xs text-secondary flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> Last active: {journey.lastActive}
                    </span>
                    <button className="text-sm font-medium text-accent hover:text-blue-700 flex items-center transition-colors group-hover:translate-x-1 duration-200">
                      {journey.status === 'completed' ? 'Review Roadmap' : 'Continue Journey'}
                      <ChevronRight className="w-4 h-4 ml-0.5" />
                    </button>
                  </div>
                </div>
              ))}

              {user.journeys.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-lg font-medium text-primary">No learning journeys yet</p>
                  <p className="text-sm text-secondary mt-1">Upload your resume to generate your first personalized roadmap.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
