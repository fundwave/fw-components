import React from 'react';
import ShowcaseSection, { VariantSection } from '../ShowcaseSection';
import EmptyState from '@fw-components/react/src/EmptyState';
import { Inbox, Search, FilePlus } from 'react-feather';

function EmptyStateShowcase() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Empty State Component</h1>
        <p className="text-lg text-gray-600">
          Placeholder views when no data is available.
        </p>
      </div>

      <ShowcaseSection title="Empty State Examples">
        <VariantSection title="No Data">
          <div className="w-full max-w-md bg-white rounded-xl shadow-sm-lg p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Data Found</h3>
            <p className="text-gray-600 mb-6">
              There's nothing here yet. Start by adding your first item.
            </p>
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
              Add New Item
            </button>
          </div>
        </VariantSection>

        <VariantSection title="Search Results">
          <div className="w-full max-w-md bg-white rounded-xl shadow-sm-lg p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Results Found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find anything matching your search. Try different keywords.
            </p>
            <button className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 font-medium">
              Clear Search
            </button>
          </div>
        </VariantSection>

        <VariantSection title="Error State">
          <div className="w-full max-w-md bg-white rounded-xl shadow-sm-lg p-12 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Something Went Wrong</h3>
            <p className="text-gray-600 mb-6">
              We encountered an error while loading your data. Please try again.
            </p>
            <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
              Try Again
            </button>
          </div>
        </VariantSection>
      </ShowcaseSection>
    </div>
  );
}

export default EmptyStateShowcase;
