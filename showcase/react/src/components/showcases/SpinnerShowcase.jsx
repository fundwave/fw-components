import React from 'react';
import ShowcaseSection, { VariantSection } from '../ShowcaseSection';
import Spinner from '@fw-components/react/src/Spinner';

function SpinnerShowcase() {
  return (
    <div>
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Spinner</h1>
        <p className="text-muted-foreground">
          Loading indicators for async operations.
        </p>
      </div>

      <ShowcaseSection title="Examples" description="Different spinner styles">
        <VariantSection title="Default Spinner">
          <Spinner />
        </VariantSection>

        <VariantSection title="Custom Sizes">
          <Spinner className="h-4 w-4" />
          <Spinner className="h-6 w-6" />
          <Spinner className="h-8 w-8" />
          <Spinner className="h-12 w-12" />
        </VariantSection>

        <VariantSection title="Custom Colors">
          <Spinner className="text-blue-600" />
          <Spinner className="text-green-600" />
          <Spinner className="text-red-600" />
          <Spinner className="text-purple-600" />
        </VariantSection>

        <VariantSection title="Spinner with Text">
          <div className="flex flex-col items-center gap-3">
            <Spinner />
            <p className="text-muted-foreground font-medium">Loading...</p>
          </div>
        </VariantSection>
      </ShowcaseSection>
    </div>
  );
}

export default SpinnerShowcase;
