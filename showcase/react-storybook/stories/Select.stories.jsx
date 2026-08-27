import Select from '@fw-components/react/src/Select';

export default {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
];

export const Default = {
  args: {
    options: options,
    placeholder: 'Select a fruit...',
  },
};

export const WithLabel = {
  args: {
    options: options,
    label: 'Choose a fruit',
    placeholder: 'Select...',
  },
};

export const WithDefaultValue = {
  args: {
    options: options,
    label: 'Favorite fruit',
    value: 'banana',
  },
};

export const Required = {
  args: {
    options: options,
    label: 'Required field',
    required: true,
    placeholder: 'Select...',
  },
};

export const Disabled = {
  args: {
    options: options,
    label: 'Disabled select',
    disabled: true,
    placeholder: 'Cannot select',
  },
};

export const MultipleSelects = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <Select 
        options={options} 
        label="Fruit" 
        placeholder="Select a fruit..." 
      />
      <Select 
        options={[
          { value: 'red', label: 'Red' },
          { value: 'blue', label: 'Blue' },
          { value: 'green', label: 'Green' },
        ]} 
        label="Color" 
        placeholder="Select a color..." 
      />
      <Select 
        options={[
          { value: 'small', label: 'Small' },
          { value: 'medium', label: 'Medium' },
          { value: 'large', label: 'Large' },
        ]} 
        label="Size" 
        placeholder="Select a size..." 
      />
    </div>
  ),
};
