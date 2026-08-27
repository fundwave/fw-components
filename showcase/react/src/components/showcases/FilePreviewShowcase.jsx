import React from 'react';
import ShowcaseSection, { VariantSection } from '../ShowcaseSection';

function FilePreviewShowcase() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">File Preview Component</h1>
        <p className="text-lg text-gray-600">
          Quick preview of file contents.
        </p>
      </div>

      <ShowcaseSection title="File Preview Examples">
        <VariantSection title="File Thumbnails">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {[
              { icon: '📄', name: 'Document.pdf', type: 'PDF' },
              { icon: '🖼️', name: 'Image.jpg', type: 'Image' },
              { icon: '📊', name: 'Data.xlsx', type: 'Excel' },
              { icon: '📝', name: 'Notes.txt', type: 'Text' },
            ].map((file, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm-lg overflow-hidden hover:shadow-sm-xl transition-shadow-sm cursor-pointer">
                <div className="bg-gradient-to-br from-purple-100 to-indigo-100 h-32 flex items-center justify-center text-5xl">
                  {file.icon}
                </div>
                <div className="p-4">
                  <div className="font-medium text-gray-900 truncate">{file.name}</div>
                  <div className="text-sm text-gray-500">{file.type}</div>
                </div>
              </div>
            ))}
          </div>
        </VariantSection>

        <VariantSection title="Image Preview">
          <div className="w-full max-w-md bg-white rounded-xl shadow-sm-lg overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center text-white text-6xl">
              🖼️
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 mb-1">sample-image.jpg</h4>
              <p className="text-sm text-gray-500">1920 x 1080 • 2.4 MB</p>
            </div>
          </div>
        </VariantSection>
      </ShowcaseSection>
    </div>
  );
}

export default FilePreviewShowcase;
