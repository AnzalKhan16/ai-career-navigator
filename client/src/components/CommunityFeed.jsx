import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, MessageSquare, Heart, RefreshCw } from 'lucide-react';
import { API_BASE_URL } from '../config';

export default function CommunityFeed() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      // Attempt to fetch from backend
      const response = await axios.get(`${API_BASE_URL}/api/community`);
      setActivities(response.data.slice(0, 10));
    } catch (err) {
      console.warn("Backend not reachable, using mock data for community feed.");
      // Fallback mock data
      setTimeout(() => {
        setActivities([
          { id: 1, user: "Anzal", role: "Data Scientist", action: "completed mini-project", target: "CNN Image Classifier", time: "2h ago", likes: 12, comments: 3 },
          { id: 2, user: "Mike T.", role: "ML Engineer", action: "achieved readiness score", target: "85%", time: "5h ago", likes: 24, comments: 5 },
          { id: 3, user: "Elena R.", role: "AI Researcher", action: "shared a resource", target: "Attention Is All You Need Notes", time: "1d ago", likes: 45, comments: 12 },
          { id: 4, user: "David K.", role: "Data Engineer", action: "started week 3", target: "Data Pipeline Orchestration", time: "1d ago", likes: 8, comments: 1 },
        ]);
        setLoading(false);
      }, 800);
      return;
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="bg-surface rounded-2xl shadow-sm border border-border p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-primary flex items-center">
          <Users className="mr-2 text-accent" />
          Community Pulse
        </h3>
        <button onClick={fetchActivities} className="text-secondary hover:text-primary transition-colors p-1">
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {loading ? (
          // Skeleton Loader
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-200 h-10 w-10"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          activities.map((item) => (
            <div key={item.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-accent/20 flex items-center justify-center border border-blue-200">
                    <span className="text-sm font-bold text-accent">{item.user.charAt(0)}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-primary">
                    <span className="font-semibold">{item.user}</span> <span className="text-secondary">{item.action}</span> <span className="font-medium text-accent">{item.target}</span>
                  </p>
                  <p className="text-xs text-secondary mt-0.5">{item.role} • {item.time}</p>
                  
                  <div className="mt-2 flex space-x-4 text-xs font-medium text-secondary">
                    <button className="flex items-center hover:text-accent transition-colors">
                      <Heart size={14} className="mr-1" /> {item.likes}
                    </button>
                    <button className="flex items-center hover:text-accent transition-colors">
                      <MessageSquare size={14} className="mr-1" /> {item.comments}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
