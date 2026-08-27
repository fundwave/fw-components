import React from 'react';
import ShowcaseSection, { VariantSection } from '../ShowcaseSection';

function FileViewerShowcase() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">File Viewer Component</h1>
        <p className="text-lg text-gray-600">
          Display various file types inline.
        </p>
      </div>

      <ShowcaseSection title="File Viewer Preview">
        <VariantSection title="Document Viewer">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm-lg overflow-hidden">
            <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📄</span>
                <span className="font-medium">Sample Document.pdf</span>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounde-xs">Download</button>
                <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounde-xs">Print</button>
              </div>
            </div>
            <div className="bg-gray-100 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📃</div>
                <p className="text-gray-600">Document preview area</p>
                <p className="text-sm text-gray-500">PDF, Word, Excel files supported</p>
              </div>
            </div>
          </div>
        </VariantSection>
      </ShowcaseSection>
    </div>
  );
}

export default FileViewerShowcase;
