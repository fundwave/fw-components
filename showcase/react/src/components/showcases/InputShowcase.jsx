import React, { useState } from 'react';
import ShowcaseSection, { VariantSection } from '../ShowcaseSection';
import { Input, Textarea } from '@fw-components/react/src/Input';

function InputShowcase() {
  const [value, setValue] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div>
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Input</h1>
        <p className="text-muted-foreground">
          Displays a form input field with two themes (primary, secondary).
        </p>
      </div>

      <ShowcaseSection
        title="Themes"
        description="Primary and secondary input themes"
      >
        <VariantSection title="Primary Theme">
          <div className="w-full max-w-sm">
            <Input
              theme="primary"
              label="Email"
              type="email"
              placeholder="your@email.com"
            />
          </div>
        </VariantSection>

        <VariantSection title="Secondary Theme">
          <div className="w-full max-w-sm">
            <Input
              theme="secondary"
              label="Email"
              type="email"
              placeholder="your@email.com"
            />
          </div>
        </VariantSection>
      </ShowcaseSection>

      <ShowcaseSection
        title="Sizes"
        description="Small, medium, and large input sizes"
      >
        <VariantSection title="Input Sizes">
          <div className="w-full max-w-sm space-y-4">
            <Input
              size="sm"
              label="Small"
              placeholder="Small input"
            />
            <Input
              size="md"
              label="Medium"
              placeholder="Medium input"
            />
            <Input
              size="lg"
              label="Large"
              placeholder="Large input"
            />
          </div>
        </VariantSection>

        <VariantSection title="Textarea Sizes">
          <div className="w-full max-w-sm space-y-4">
            <Textarea
              size="sm"
              label="Small"
              placeholder="Small textarea..."
              rows={3}
            />
            <Textarea
              size="md"
              label="Medium"
              placeholder="Medium textarea..."
              rows={4}
            />
            <Textarea
              size="lg"
              label="Large"
              placeholder="Large textarea..."
              rows={5}
            />
          </div>
        </VariantSection>
      </ShowcaseSection>

      <ShowcaseSection
        title="States"
        description="Different input states"
      >
        <VariantSection title="Default">
          <div className="w-full max-w-sm space-y-2">
            <Input
              placeholder="Enter text..."
              value={value}
              onChange={setValue}
            />
          </div>
        </VariantSection>

        <VariantSection title="Disabled">
          <div className="w-full max-w-sm">
            <Input
              placeholder="Disabled input"
              disabled
            />
          </div>
        </VariantSection>

        <VariantSection title="With Error">
          <div className="w-full max-w-sm">
            <Input
              label="Username"
              placeholder="Enter username"
              required
              invalid
              errorMessage="Username is required."
            />
          </div>
        </VariantSection>
      </ShowcaseSection>

      <ShowcaseSection
        title="Variations"
        description="Different input types and features"
      >
        <VariantSection title="With Label">
          <div className="w-full max-w-sm space-y-2">
            <Input
              label="Email Address"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={setEmail}
            />
          </div>
        </VariantSection>

        <VariantSection title="With Icon">
          <div className="w-full max-w-sm">
            <Input
              icon="Search"
              placeholder="Search..."
            />
          </div>
        </VariantSection>

        <VariantSection title="Number Input">
          <div className="w-full max-w-sm">
            <Input
              label="Price"
              type="number"
              placeholder="0.00"
            />
          </div>
        </VariantSection>

        <VariantSection title="Textarea">
          <div className="w-full max-w-sm">
            <Textarea
              label="Message"
              placeholder="Type your message here..."
              rows={4}
            />
          </div>
        </VariantSection>
      </ShowcaseSection>
    </div>
  );
}

export default InputShowcase;
