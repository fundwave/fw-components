import React, { useState } from 'react';
import ShowcaseSection, { VariantSection } from '../ShowcaseSection';
import ProgressBar from '@fw-components/react/src/ProgressBar';

function ProgressBarShowcase() {
  const [progress, setProgress] = useState(60);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Progress Bar Component</h1>
        <p className="text-lg text-gray-600">
          Visual indicators for progress and completion.
        </p>
      </div>

      <ShowcaseSection title="Progress Bar Variants" description="Different progress bar styles">
        <VariantSection title="Indeterminate Progress Bar">
          <div className="w-full max-w-md space-y-4">
            <ProgressBar />
            <ProgressBar className="h-2" />
            <ProgressBar color="bg-green-500" />
          </div>
        </VariantSection>

        <VariantSection title="Progress Bar with Label">
          <div className="w-full max-w-md space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Upload Progress</span>
                <span className="text-sm font-medium text-gray-700">60%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-purple-600 h-3 rounded-full transition-all" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </VariantSection>

        <VariantSection title="Colored Progress Bars">
          <div className="w-full max-w-md space-y-4">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-green-600 h-3 rounded-full" style={{ width: '90%' }}></div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '50%' }}></div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-red-600 h-3 rounded-full" style={{ width: '20%' }}></div>
            </div>
          </div>
        </VariantSection>

        <VariantSection title="Interactive Progress Bar">
          <div className="w-full max-w-md space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Adjust Progress</span>
                <span className="text-sm font-medium text-purple-600">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 h-4 rounded-full transition-all shadow-sm-lg" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                className="w-full mt-4"
              />
            </div>
          </div>
        </VariantSection>
      </ShowcaseSection>
    </div>
  );
}

export default ProgressBarShowcase;
