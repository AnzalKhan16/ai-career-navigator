import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Printer } from 'lucide-react';
import Navbar from './components/Navbar';
import UploadScreen from './components/UploadScreen';
import MetricsDashboard from './components/MetricsDashboard';
import RoadmapTimeline from './components/RoadmapTimeline';
import CommunityFeed from './components/CommunityFeed';
import ProfileView from './components/ProfileView';

function DashboardView() {
  const [hasUploaded, setHasUploaded] = useState(false);
  const [targetRole, setTargetRole] = useState(null);

  const handleUploadComplete = (role) => {
    setTargetRole(role);
    setHasUploaded(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full">
      {!hasUploaded ? (
        <UploadScreen onComplete={handleUploadComplete} />
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex justify-between items-center mb-8 print:hidden">
            <div>
              <h2 className="text-3xl font-bold text-primary">Your Career Roadmap</h2>
              <p className="text-secondary mt-1">Targeting: <span className="font-semibold text-accent capitalize">{targetRole.replace('-', ' ')}</span></p>
            </div>
            <button 
              onClick={handlePrint}
              className="flex items-center px-4 py-2 bg-white border border-border rounded-lg text-sm font-medium text-primary hover:bg-gray-50 hover:text-accent transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4 mr-2" />
              Export PDF
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <MetricsDashboard />
              <RoadmapTimeline />
            </div>
            {/* The community feed is hidden during printing to focus on the personal roadmap */}
            <div className="lg:col-span-1 print:hidden">
              <CommunityFeed />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<DashboardView />} />
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/settings" element={
              <div className="flex items-center justify-center h-[60vh]">
                <h1 className="text-4xl font-semibold text-secondary">Settings View</h1>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
