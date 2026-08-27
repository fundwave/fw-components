import React from 'react';
import ShowcaseSection, { VariantSection } from '../ShowcaseSection';
import Button from '@fw-components/react/src/Button';
import { 
  Heart, 
  Trash2, 
  Edit, 
  Plus,
  Check,
  X 
} from 'react-feather';

function ButtonShowcase() {
  return (
    <div>
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Button</h1>
        <p className="text-muted-foreground">
          Displays a button with 4 variants (filled, outlined, ghost, plain), 3 themes (primary, secondary, danger), and 2 modes (text, icon).
        </p>
      </div>

      <ShowcaseSection
        title="Variants by Theme"
        description="All 4 variants across 3 themes"
      >
        <VariantSection title="Primary Theme">
          <Button theme="primary" variant="filled" title="Filled" />
          <Button theme="primary" variant="outlined" title="Outlined" />
          <Button theme="primary" variant="ghost" title="Ghost" />
          <Button theme="primary" variant="plain" title="Plain" />
        </VariantSection>

        <VariantSection title="Secondary Theme">
          <Button theme="secondary" variant="filled" title="Filled" />
          <Button theme="secondary" variant="outlined" title="Outlined" />
          <Button theme="secondary" variant="ghost" title="Ghost" />
          <Button theme="secondary" variant="plain" title="Plain" />
        </VariantSection>

        <VariantSection title="Danger Theme">
          <Button theme="danger" variant="filled" title="Delete" />
          <Button theme="danger" variant="outlined" title="Remove" />
          <Button theme="danger" variant="ghost" title="Cancel" />
          <Button theme="danger" variant="plain" title="Discard" />
        </VariantSection>
      </ShowcaseSection>

      <ShowcaseSection
        title="Icon Mode"
        description="Icon-only buttons with all variants and themes"
      >
        <VariantSection title="Primary Icons">
          <Button theme="primary" variant="filled" mode="icon" icon={Heart} title="Like" />
          <Button theme="primary" variant="outlined" mode="icon" icon={Edit} title="Edit" />
          <Button theme="primary" variant="ghost" mode="icon" icon={Plus} title="Add" />
          <Button theme="primary" variant="plain" mode="icon" icon={Check} title="Check" />
        </VariantSection>

        <VariantSection title="Secondary Icons">
          <Button theme="secondary" variant="filled" mode="icon" icon={Heart} title="Like" />
          <Button theme="secondary" variant="outlined" mode="icon" icon={Edit} title="Edit" />
          <Button theme="secondary" variant="ghost" mode="icon" icon={Plus} title="Add" />
          <Button theme="secondary" variant="plain" mode="icon" icon={Check} title="Check" />
        </VariantSection>

        <VariantSection title="Danger Icons">
          <Button theme="danger" variant="filled" mode="icon" icon={Trash2} title="Delete" />
          <Button theme="danger" variant="outlined" mode="icon" icon={X} title="Close" />
          <Button theme="danger" variant="ghost" mode="icon" icon={Trash2} title="Remove" />
          <Button theme="danger" variant="plain" mode="icon" icon={X} title="Cancel" />
        </VariantSection>
      </ShowcaseSection>

      <ShowcaseSection
        title="Text with Icon"
        description="Text buttons with leading icons"
      >
        <VariantSection title="Primary with Icons">
          <Button theme="primary" variant="filled" icon={Plus} title="Add New" />
          <Button theme="primary" variant="outlined" icon={Edit} title="Edit" />
          <Button theme="primary" variant="ghost" icon={Heart} title="Like" />
          <Button theme="primary" variant="plain" icon={Check} title="Approve" />
        </VariantSection>

        <VariantSection title="Secondary with Icons">
          <Button theme="secondary" variant="filled" icon={Plus} title="Create" />
          <Button theme="secondary" variant="outlined" icon={Edit} title="Modify" />
          <Button theme="secondary" variant="ghost" icon={Heart} title="Favorite" />
          <Button theme="secondary" variant="plain" icon={Check} title="Confirm" />
        </VariantSection>

        <VariantSection title="Danger with Icons">
          <Button theme="danger" variant="filled" icon={Trash2} title="Delete" />
          <Button theme="danger" variant="outlined" icon={X} title="Remove" />
          <Button theme="danger" variant="ghost" icon={Trash2} title="Discard" />
          <Button theme="danger" variant="plain" icon={X} title="Cancel" />
        </VariantSection>
      </ShowcaseSection>

      <ShowcaseSection
        title="Sizes"
        description="Small, medium, and large sizes for text and icon modes"
      >
        <VariantSection title="Text Button Sizes">
          <Button theme="primary" variant="filled" size="sm" title="Small" />
          <Button theme="primary" variant="filled" size="md" title="Medium" />
          <Button theme="primary" variant="filled" size="lg" title="Large" />
        </VariantSection>

        <VariantSection title="Icon Button Sizes">
          <Button theme="primary" variant="filled" mode="icon" size="sm" icon={Heart} title="Small" />
          <Button theme="primary" variant="filled" mode="icon" size="md" icon={Heart} title="Medium" />
          <Button theme="primary" variant="filled" mode="icon" size="lg" icon={Heart} title="Large" />
        </VariantSection>

        <VariantSection title="Text with Icon Sizes">
          <Button theme="primary" variant="filled" size="sm" icon={Plus} title="Small" />
          <Button theme="primary" variant="filled" size="md" icon={Plus} title="Medium" />
          <Button theme="primary" variant="filled" size="lg" icon={Plus} title="Large" />
        </VariantSection>
      </ShowcaseSection>

      <ShowcaseSection
        title="States"
        description="Disabled and loading states"
      >
        <VariantSection title="Disabled States">
          <Button theme="primary" variant="filled" title="Disabled" disabled />
          <Button theme="secondary" variant="outlined" title="Disabled" disabled />
          <Button theme="danger" variant="filled" icon={Trash2} title="Disabled" disabled />
          <Button theme="primary" variant="ghost" mode="icon" icon={Heart} title="Disabled" disabled />
        </VariantSection>

        <VariantSection title="Loading States">
          <Button theme="primary" variant="filled" title="Loading" onClick={async () => new Promise(resolve => setTimeout(resolve, 2000))} />
          <Button theme="secondary" variant="outlined" title="Processing" onClick={async () => new Promise(resolve => setTimeout(resolve, 2000))} />
          <Button theme="danger" variant="filled" icon={Trash2} title="Deleting" onClick={async () => new Promise(resolve => setTimeout(resolve, 2000))} />
        </VariantSection>
      </ShowcaseSection>
    </div>
  );
}

export default ButtonShowcase;
