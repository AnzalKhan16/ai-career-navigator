import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';
import { Briefcase, Activity, Target } from 'lucide-react';
import RoadmapGenerator from '../components/RoadmapGenerator';
import RoadmapDisplay from '../components/RoadmapDisplay';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [activities, setActivities] = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);
  const [activeTab, setActiveTab] = useState('generator'); // 'generator' or 'history'
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const [activityRes, roadmapRes] = await Promise.all([
        API.get('/activities'),
        API.get('/roadmaps')
      ]);
      setActivities(activityRes.data);
      setRoadmaps(roadmapRes.data);
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl font-bold mb-2">Welcome back, <span className="text-gradient">{user?.name}</span></h1>
        <p className="text-secondary text-lg">Let's continue building your tech career roadmap.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => { setActiveTab('generator'); setSelectedRoadmap(null); }}
          className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
            activeTab === 'generator' 
              ? 'bg-white/10 text-white shadow-lg border border-white/20' 
              : 'text-secondary hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <Target className="w-5 h-5" />
          Generate New
        </button>
        <button 
          onClick={() => { setActiveTab('history'); setSelectedRoadmap(null); }}
          className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
            activeTab === 'history' 
              ? 'bg-white/10 text-white shadow-lg border border-white/20' 
              : 'text-secondary hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <Briefcase className="w-5 h-5" />
          My Roadmaps ({roadmaps.length})
        </button>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {activeTab === 'generator' ? (
            <div className="glass-card p-8 rounded-2xl border border-white/10">
               <RoadmapGenerator onGenerateSuccess={() => {
                 fetchUserData();
                 setActiveTab('history');
               }} />
            </div>
          ) : (
            <div className="space-y-6">
              {selectedRoadmap ? (
                <RoadmapDisplay 
                  roadmap={selectedRoadmap} 
                  onBack={() => setSelectedRoadmap(null)} 
                />
              ) : roadmaps.length === 0 ? (
                <div className="glass-card p-8 rounded-2xl text-center text-secondary">
                  No roadmaps generated yet. Go create one!
                </div>
              ) : (
                roadmaps.map((rm) => (
                  <div 
                    key={rm._id} 
                    onClick={() => setSelectedRoadmap(rm)}
                    className="glass-card p-6 rounded-2xl hover-lift cursor-pointer flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-xl font-bold mb-2 capitalize">{rm.currentRole} ➔ {rm.targetRole}</h3>
                      <p className="text-sm text-secondary">Generated on {new Date(rm.createdAt).toLocaleDateString()}</p>
                    </div>
                    <Target className="w-6 h-6 text-accent-blue/50" />
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Activity Feed Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-6 rounded-2xl sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-accent-blue" />
              <h3 className="text-lg font-semibold">Activity Feed</h3>
            </div>
            
            <div className="space-y-4">
              {activities.length === 0 ? (
                <p className="text-secondary text-sm">No recent activity.</p>
              ) : (
                activities.slice(0, 5).map((act) => (
                  <div key={act._id} className="relative pl-6 pb-4 border-l border-white/10 last:border-0 last:pb-0">
                    <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-accent-purple shadow-[0_0_10px_rgba(139,92,246,0.8)]"></div>
                    <p className="text-sm font-medium">{act.action}</p>
                    <p className="text-xs text-secondary mt-1 capitalize">Target: {act.targetRole}</p>
                    <p className="text-xs text-white/30 mt-1">{new Date(act.createdAt).toLocaleDateString()}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
