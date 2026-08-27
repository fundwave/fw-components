import Spinner from '@fw-components/react/src/Spinner';

export default {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export const Default = {
  args: {
    size: 'md',
  },
};

export const Small = {
  args: {
    size: 'sm',
  },
};

export const Large = {
  args: {
    size: 'lg',
  },
};

export const AllSizes = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="sm" />
        <span className="text-xs">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" />
        <span className="text-xs">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <span className="text-xs">Large</span>
      </div>
    </div>
  ),
};

export const InButton = {
  render: () => (
    <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md">
      <Spinner size="sm" />
      Loading...
    </button>
  ),
};
