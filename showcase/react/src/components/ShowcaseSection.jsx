import React from 'react';

function ShowcaseSection({ title, description, children }) {
  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">{title}</h2>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>
      <div className="space-y-8">
        {children}
      </div>
    </div>
  );
}

export function VariantSection({ title, children }) {
  return (
    <div className="space-y-4">
      {title && (
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
      )}
      <div className="flex flex-wrap gap-4 items-center">
        {children}
      </div>
    </div>
  );
}

export function CodeBlock({ children }) {
  return (
    <pre className="bg-muted text-foreground p-4 rounded-md overflow-x-auto text-sm border border-border">
      <code>{children}</code>
    </pre>
  );
}

export default ShowcaseSection;
