import React from 'react';
import ShowcaseSection, { VariantSection } from '../ShowcaseSection';

function ChartShowcase() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Chart Component</h1>
        <p className="text-lg text-gray-600">
          Data visualization with charts and graphs (using Recharts).
        </p>
      </div>

      <ShowcaseSection title="Chart Placeholders" description="Visual representation of data">
        <VariantSection title="Bar Chart Preview">
          <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-sm-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Monthly Sales</h3>
            <div className="flex items-end justify-around h-64 gap-4">
              {[40, 65, 45, 80, 55, 70].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t-lg transition-all hover:from-purple-700 hover:to-indigo-600"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-gray-500">M{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </VariantSection>

        <VariantSection title="Line Chart Preview">
          <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-sm-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Growth Trend</h3>
            <div className="h-48 flex items-end">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                <polyline
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="3"
                  points="0,150 60,120 120,140 180,80 240,100 300,60 360,80"
                />
                <polyline
                  fill="url(#gradient)"
                  stroke="none"
                  points="0,150 60,120 120,140 180,80 240,100 300,60 360,80 360,200 0,200"
                  opacity="0.3"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </VariantSection>
      </ShowcaseSection>
    </div>
  );
}

export default ChartShowcase;
