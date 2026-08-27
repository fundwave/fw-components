import React, { useState } from 'react';
import ShowcaseSection, { VariantSection } from '../ShowcaseSection';

function SearchInputShowcase() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Search Input Component</h1>
        <p className="text-lg text-gray-600">
          Specialized input fields for search functionality.
        </p>
      </div>

      <ShowcaseSection title="Search Input Examples">
        <VariantSection title="Basic Search">
          <div className="w-full max-w-md relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-hidden"
            />
          </div>
        </VariantSection>

        <VariantSection title="Search with Clear Button">
          <div className="w-full max-w-md relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
              🔍
            </span>
            <input
              type="text"
              placeholder="Type to search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-hidden"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </VariantSection>

        <VariantSection title="Search with Button">
          <div className="w-full max-w-md flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-hidden"
              />
            </div>
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
              Search
            </button>
          </div>
        </VariantSection>
      </ShowcaseSection>
    </div>
  );
}

export default SearchInputShowcase;
