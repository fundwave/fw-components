import React, { useState } from 'react';
import ShowcaseSection, { VariantSection } from '../ShowcaseSection';

function ActionMenuShowcase() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Action Menu Component</h1>
        <p className="text-lg text-gray-600">
          Context menus for quick actions.
        </p>
      </div>

      <ShowcaseSection title="Action Menu Examples">
        <VariantSection title="Basic Action Menu">
          <div className="relative inline-block">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
            >
              <span>Actions</span>
              <span>▼</span>
            </button>
            {isOpen && (
              <div className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-sm-xl border border-gray-200 py-1 z-10">
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2">
                  <span>✏️</span>
                  <span>Edit</span>
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2">
                  <span>📋</span>
                  <span>Duplicate</span>
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2">
                  <span>📤</span>
                  <span>Share</span>
                </button>
                <hr className="my-1 border-gray-200" />
                <button className="w-full px-4 py-2 text-left hover:bg-red-50 text-red-600 flex items-center gap-2">
                  <span>🗑️</span>
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </VariantSection>

        <VariantSection title="Icon Menu">
          <div className="relative inline-block">
            <button className="p-2 hover:bg-gray-100 rounded-lg text-2xl">
              ⋮
            </button>
          </div>
        </VariantSection>
      </ShowcaseSection>
    </div>
  );
}

export default ActionMenuShowcase;
