import React, { useState } from 'react';
import ShowcaseSection, { VariantSection } from '../ShowcaseSection';
import Select from '@fw-components/react/src/Select';

function SelectShowcase() {
  const [selected, setSelected] = useState(null);
  const [multiSelected, setMultiSelected] = useState([]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Select Component</h1>
        <p className="text-lg text-gray-600">
          Dropdown select components for choosing from multiple options.
        </p>
      </div>

      <ShowcaseSection
        title="Select Variants"
        description="Different select dropdown styles"
      >
        <VariantSection title="Basic Select">
          <div className="w-full max-w-md space-y-4">
            <Select
              placeholder="Select an option..."
              options={[
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
                { label: 'Option 4', value: 'option4' },
              ]}
              value={selected}
              onChange={setSelected}
            />
          </div>
        </VariantSection>

        <VariantSection title="Select with Label">
          <div className="w-full max-w-md space-y-2">
            <Select
              label="Choose Country"
              placeholder="Select country..."
              options={[
                { label: 'United States', value: 'us' },
                { label: 'United Kingdom', value: 'uk' },
                { label: 'Canada', value: 'ca' },
                { label: 'Australia', value: 'au' },
              ]}
              value={selected}
              onChange={setSelected}
            />
          </div>
        </VariantSection>

        <VariantSection title="Multiple Select">
          <div className="w-full max-w-md">
            <Select
              isMulti
              placeholder="Select colors..."
              options={[
                { label: 'Red', value: 'red' },
                { label: 'Blue', value: 'blue' },
                { label: 'Green', value: 'green' },
                { label: 'Yellow', value: 'yellow' },
                { label: 'Purple', value: 'purple' },
              ]}
              value={multiSelected}
              onChange={setMultiSelected}
            />
          </div>
        </VariantSection>

        <VariantSection title="Disabled Select">
          <div className="w-full max-w-md">
            <Select
              placeholder="Cannot select..."
              disabled
              options={[
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
              ]}
            />
          </div>
        </VariantSection>
      </ShowcaseSection>
    </div>
  );
}

export default SelectShowcase;
