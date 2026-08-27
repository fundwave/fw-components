import React, { useState } from 'react';
import ShowcaseSection, { VariantSection } from '../ShowcaseSection';

function InfiniteScrollShowcase() {
  const [items] = useState(Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Infinite Scroll Component</h1>
        <p className="text-lg text-gray-600">
          Load more content as user scrolls.
        </p>
      </div>

      <ShowcaseSection title="Infinite Scroll Example">
        <VariantSection title="Scrollable List">
          <div className="w-full max-w-2xl">
            <div className="bg-white rounded-xl shadow-sm-lg max-h-96 overflow-y-auto">
              <div className="divide-y divide-gray-200">
                {items.map((item, i) => (
                  <div key={i} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item}</div>
                        <div className="text-sm text-gray-500">
                          This is a sample description for {item.toLowerCase()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 text-center border-t border-gray-200">
                <div className="inline-flex items-center gap-2 text-gray-500">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-purple-600 rounded-full animate-spin"></div>
                  <span>Loading more...</span>
                </div>
              </div>
            </div>
          </div>
        </VariantSection>

        <VariantSection title="Grid Layout">
          <div className="w-full">
            <div className="bg-white rounded-xl shadow-sm-lg max-h-96 overflow-y-auto p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {items.slice(0, 12).map((item, i) => (
                  <div key={i} className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg p-6 text-center hover:shadow-sm-md transition-shadow-sm">
                    <div className="text-3xl mb-2">📦</div>
                    <div className="font-medium text-gray-900">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </VariantSection>
      </ShowcaseSection>
    </div>
  );
}

export default InfiniteScrollShowcase;
