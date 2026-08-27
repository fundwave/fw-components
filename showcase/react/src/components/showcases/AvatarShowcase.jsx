import React from 'react';
import ShowcaseSection, { VariantSection } from '../ShowcaseSection';
import Avatar from '@fw-components/react/src/Avatar';

function AvatarShowcase() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Avatar Component</h1>
        <p className="text-lg text-gray-600">
          User profile images and placeholders.
        </p>
      </div>

      <ShowcaseSection
        title="Avatar Variants"
        description="Different avatar styles and sizes"
      >
        <VariantSection title="Avatar Sizes">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            AB
          </div>
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
            AB
          </div>
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
            AB
          </div>
          <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            AB
          </div>
        </VariantSection>

        <VariantSection title="Avatar Colors">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
            JD
          </div>
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            SM
          </div>
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
            KL
          </div>
          <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
            RP
          </div>
          <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            MN
          </div>
        </VariantSection>

        <VariantSection title="Avatar with Status">
          <div className="relative w-16 h-16">
            <div className="w-full h-full bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              AB
            </div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="relative w-16 h-16">
            <div className="w-full h-full bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              CD
            </div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="relative w-16 h-16">
            <div className="w-full h-full bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
              EF
            </div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 rounded-full border-2 border-white"></div>
          </div>
        </VariantSection>

        <VariantSection title="Avatar Group">
          <div className="flex -space-x-4">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-white">
              AB
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-white">
              CD
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-white">
              EF
            </div>
            <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white">
              +5
            </div>
          </div>
        </VariantSection>

        <VariantSection title="Square Avatars">
          <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
            AB
          </div>
          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            CD
          </div>
          <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">
            EF
          </div>
        </VariantSection>
      </ShowcaseSection>
    </div>
  );
}

export default AvatarShowcase;
