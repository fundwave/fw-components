import React, { useState } from 'react';
import ShowcaseSection, { VariantSection } from '../ShowcaseSection';
import { Calendar28 } from '@fw-components/react/src/DatePicker';

function DatePickerShowcase() {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Date Picker</h1>
        <p className="text-muted-foreground">
          Calendar-based date selection with popover interface.
        </p>
      </div>

      <ShowcaseSection title="Date Picker Examples" description="Select dates using calendar interface">
        <VariantSection title="Calendar Date Picker">
          <div className="w-full max-w-md">
            <Calendar28 />
          </div>
        </VariantSection>

        <VariantSection title="Multiple Date Pickers">
          <div className="w-full max-w-2xl space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Start Date</label>
              <Calendar28 />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">End Date</label>
              <Calendar28 />
            </div>
          </div>
        </VariantSection>

        <VariantSection title="Native Date Inputs">
          <div className="w-full max-w-md space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Date & Time</label>
              <input
                type="datetime-local"
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Month</label>
              <input
                type="month"
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </VariantSection>
      </ShowcaseSection>
    </div>
  );
}

export default DatePickerShowcase;
