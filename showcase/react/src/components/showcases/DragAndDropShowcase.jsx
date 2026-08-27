import React, { useState } from 'react';
import ShowcaseSection, { VariantSection } from '../ShowcaseSection';

function DragAndDropShowcase() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Drag & Drop Component</h1>
        <p className="text-lg text-gray-600">
          Reorderable lists with drag and drop (using dnd-kit).
        </p>
      </div>

      <ShowcaseSection title="Drag & Drop Examples">
        <VariantSection title="Sortable List">
          <div className="w-full max-w-md space-y-3">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-lg p-4 flex items-center gap-3 cursor-move hover:border-purple-500 hover:shadow-sm-md transition-all"
              >
                <span className="text-gray-400 text-xl">☰</span>
                <span className="font-medium text-gray-900">{item}</span>
              </div>
            ))}
          </div>
        </VariantSection>

        <VariantSection title="Kanban Board">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {['To Do', 'In Progress', 'Done'].map((column) => (
              <div key={column} className="bg-gray-100 rounded-xl p-4">
                <h4 className="font-semibold text-gray-700 mb-3">{column}</h4>
                <div className="space-y-2">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg p-3 shadow-sm hover:shadow-sm-md transition-shadow-sm cursor-move"
                    >
                      <div className="font-medium text-gray-900 mb-1">Task {i}</div>
                      <div className="text-sm text-gray-500">Description here</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </VariantSection>
      </ShowcaseSection>
    </div>
  );
}

export default DragAndDropShowcase;
