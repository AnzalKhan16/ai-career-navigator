import React from 'react';
import { Calendar, BookOpen, Code, ExternalLink, Play } from 'lucide-react';

export default function RoadmapTimeline() {
  const weeks = [
    {
      id: 1,
      title: "Deep Learning Foundations",
      duration: "Week 1-2",
      description: "Understand the core concepts of neural networks, backpropagation, and optimization algorithms.",
      topics: ["Perceptrons", "Activation Functions", "Gradient Descent"],
      links: [{ name: "Neural Networks (3Blue1Brown)", url: "#" }],
      project: { name: "Build a multi-layer perceptron from scratch in NumPy", type: "code" }
    },
    {
      id: 2,
      title: "Computer Vision & CNNs",
      duration: "Week 3-4",
      description: "Dive into image processing and Convolutional Neural Networks.",
      topics: ["Convolution Operations", "Pooling Layers", "ResNet Architecture"],
      links: [{ name: "CS231n CNNs for Visual Recognition", url: "#" }],
      project: { name: "Image Classifier with PyTorch", type: "code" }
    },
    {
      id: 3,
      title: "Model Deployment & MLOps",
      duration: "Week 5-6",
      description: "Learn how to package, deploy, and monitor machine learning models in production.",
      topics: ["Docker", "FastAPI", "Model Serving"],
      links: [{ name: "Full Stack Deep Learning", url: "#" }],
      project: { name: "Deploy CNN as a REST API", type: "deployment" }
    }
  ];

  return (
    <div className="bg-surface rounded-2xl shadow-sm border border-border p-6 sm:p-8 w-full">
      <h3 className="text-xl font-bold text-primary mb-8 flex items-center">
        <Calendar className="mr-2 text-accent" />
        Personalized Learning Roadmap
      </h3>
      
      <div className="relative border-l-2 border-gray-200 ml-3 md:ml-6 space-y-12">
        {weeks.map((week, index) => (
          <div key={week.id} className="relative pl-8 md:pl-10">
            {/* Timeline Dot */}
            <div className="absolute w-8 h-8 bg-white border-2 border-accent rounded-full -left-[17px] top-0 flex items-center justify-center text-accent shadow-sm">
              <span className="text-xs font-bold">{index + 1}</span>
            </div>
            
            <div className="bg-white rounded-xl border border-border p-6 hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-bold text-accent uppercase tracking-wider">{week.duration}</span>
                  <h4 className="text-lg font-bold text-primary mt-1">{week.title}</h4>
                </div>
              </div>
              
              <p className="text-secondary text-sm mb-5">{week.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center mb-3">
                    <BookOpen className="w-4 h-4 mr-1 text-secondary" /> Topics
                  </h5>
                  <ul className="space-y-2">
                    {week.topics.map((topic, i) => (
                      <li key={i} className="text-sm text-secondary flex items-center">
                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-2"></div>
                        {topic}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    {week.links.map((link, i) => (
                      <a key={i} href={link.url} className="text-sm font-medium text-accent hover:text-blue-700 flex items-center transition-colors">
                        <Play className="w-3 h-3 mr-1" /> {link.name}
                      </a>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex flex-col justify-center">
                  <h5 className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center mb-2">
                    <Code className="w-4 h-4 mr-1 text-secondary" /> Mini-Project
                  </h5>
                  <p className="text-sm font-medium text-primary mt-1">{week.project.name}</p>
                  <button className="mt-3 text-xs bg-white border border-border text-primary px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors self-start font-medium inline-flex items-center">
                    View Details <ExternalLink className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
