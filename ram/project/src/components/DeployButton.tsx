import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const DeployButton: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col space-y-3">
        {/* Deploy to Netlify Button */}
        <a
          href="https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/walmart-ai-supply-chain"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Deploy to Netlify
        </a>
        
        {/* GitHub Repository Button */}
        <a
          href="https://github.com/YOUR_USERNAME/walmart-ai-supply-chain"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          <Github className="h-4 w-4 mr-2" />
          View on GitHub
        </a>
      </div>
    </div>
  );
};

export default DeployButton;