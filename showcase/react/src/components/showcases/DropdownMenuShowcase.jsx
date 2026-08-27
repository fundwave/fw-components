import React, { useState } from 'react';
import ShowcaseSection, { VariantSection } from '../ShowcaseSection';

function DropdownMenuShowcase() {
  const [selected, setSelected] = useState('Select option...');
  const [isOpen, setIsOpen] = useState(false);

  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Dropdown Menu Component</h1>
        <p className="text-lg text-gray-600">
          Custom dropdown menus with enhanced styling.
        </p>
      </div>

      <ShowcaseSection title="Dropdown Examples">
        <VariantSection title="Custom Dropdown">
          <div className="w-full max-w-md relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-left flex justify-between items-center hover:border-purple-500"
            >
              <span>{selected}</span>
              <span>▼</span>
            </button>
            {isOpen && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-sm-xl border border-gray-200 py-1 z-10">
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelected(option);
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-purple-50 hover:text-purple-600"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </VariantSection>

        <VariantSection title="Dropdown with Icons">
          <div className="w-full max-w-md">
            <div className="bg-white border border-gray-300 rounded-lg">
              <button className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 rounded-t-lg">
                <span className="text-xl">📁</span>
                <span>Documents</span>
              </button>
              <button className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3">
                <span className="text-xl">🖼️</span>
                <span>Images</span>
              </button>
              <button className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 rounded-b-lg">
                <span className="text-xl">🎵</span>
                <span>Music</span>
              </button>
            </div>
          </div>
        </VariantSection>
      </ShowcaseSection>
    </div>
  );
}

export default DropdownMenuShowcase;
