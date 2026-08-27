import React from 'react';
import ShowcaseSection, { VariantSection } from '../ShowcaseSection';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@fw-components/react/src/Tooltip';

function TooltipShowcase() {
  return (
    <div>
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Tooltip</h1>
        <p className="text-muted-foreground">
          Contextual information on hover.
        </p>
      </div>

      <ShowcaseSection
        title="Tooltip Examples"
        description="Hover over elements to see tooltips"
      >
        <VariantSection title="Basic Tooltip">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent">
                  Hover me
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This is a tooltip</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </VariantSection>

        <VariantSection title="Positioned Tooltips">
          <TooltipProvider>
            <div className="flex gap-4 flex-wrap">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="px-4 py-2 border border-border rounded-lg">Top</button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Tooltip on top</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="px-4 py-2 border border-border rounded-lg">Bottom</button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Tooltip on bottom</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="px-4 py-2 border border-border rounded-lg">Left</button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Tooltip on left</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="px-4 py-2 border border-border rounded-lg">Right</button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Tooltip on right</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </VariantSection>
      </ShowcaseSection>
    </div>
  );
}

export default TooltipShowcase;
