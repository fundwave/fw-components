import React from 'react';
import ShowcaseSection, { VariantSection } from '../ShowcaseSection';

function EditorShowcase() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Editor Component</h1>
        <p className="text-lg text-gray-600">
          Rich text editor for content creation (TinyMCE based).
        </p>
      </div>

      <ShowcaseSection title="Editor Preview">
        <VariantSection title="Rich Text Editor">
          <div className="w-full bg-white rounded-xl shadow-sm-lg overflow-hidden">
            <div className="bg-gray-100 border-b border-gray-300 p-2 flex gap-2 flex-wrap">
              <button className="px-3 py-1 hover:bg-gray-200 rounde-xs text-sm font-medium">𝐁</button>
              <button className="px-3 py-1 hover:bg-gray-200 rounde-xs text-sm italic">𝐼</button>
              <button className="px-3 py-1 hover:bg-gray-200 rounde-xs text-sm underline">U</button>
              <div className="w-px bg-gray-300"></div>
              <button className="px-3 py-1 hover:bg-gray-200 rounde-xs text-sm">≡</button>
              <button className="px-3 py-1 hover:bg-gray-200 rounde-xs text-sm">•</button>
              <button className="px-3 py-1 hover:bg-gray-200 rounde-xs text-sm">1.</button>
              <div className="w-px bg-gray-300"></div>
              <button className="px-3 py-1 hover:bg-gray-200 rounde-xs text-sm">🔗</button>
              <button className="px-3 py-1 hover:bg-gray-200 rounde-xs text-sm">🖼️</button>
            </div>
            <div className="p-6 min-h-[300px] bg-white">
              <p className="text-gray-400">Start typing here...</p>
            </div>
          </div>
        </VariantSection>
      </ShowcaseSection>
    </div>
  );
}

export default EditorShowcase;
