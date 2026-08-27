import React from 'react';
import ShowcaseSection, { VariantSection } from '../ShowcaseSection';

function BadgeShowcase() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Badge Component</h1>
        <p className="text-lg text-gray-600">
          Small status descriptors for UI elements.
        </p>
      </div>

      <ShowcaseSection
        title="Badge Variants"
        description="Different badge styles and colors"
      >
        <VariantSection title="Basic Badges">
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
            Primary
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            Info
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            Success
          </span>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
            Warning
          </span>
          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
            Danger
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
            Default
          </span>
        </VariantSection>

        <VariantSection title="Solid Badges">
          <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-medium shadow-sm-md">
            Primary
          </span>
          <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium shadow-sm-md">
            Info
          </span>
          <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-medium shadow-sm-md">
            Success
          </span>
          <span className="px-3 py-1 bg-yellow-600 text-white rounded-full text-sm font-medium shadow-sm-md">
            Warning
          </span>
          <span className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-medium shadow-sm-md">
            Danger
          </span>
        </VariantSection>

        <VariantSection title="Outline Badges">
          <span className="px-3 py-1 border-2 border-purple-600 text-purple-600 rounded-full text-sm font-medium">
            Primary
          </span>
          <span className="px-3 py-1 border-2 border-blue-600 text-blue-600 rounded-full text-sm font-medium">
            Info
          </span>
          <span className="px-3 py-1 border-2 border-green-600 text-green-600 rounded-full text-sm font-medium">
            Success
          </span>
        </VariantSection>

        <VariantSection title="Custom Styling">
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Custom Purple</Badge>
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Custom Green</Badge>
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">Custom Orange</Badge>
        </VariantSection>
      </ShowcaseSection>
    </div>
  );
}

export default BadgeShowcase;
