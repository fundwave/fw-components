import ProgressBar from '@fw-components/react/src/ProgressBar';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
};

export const Default = {
  args: {
    value: 50,
  },
};

export const Empty = {
  args: {
    value: 0,
  },
};

export const Quarter = {
  args: {
    value: 25,
  },
};

export const Half = {
  args: {
    value: 50,
  },
};

export const ThreeQuarters = {
  args: {
    value: 75,
  },
};

export const Full = {
  args: {
    value: 100,
  },
};

export const MultipleProgressBars = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>Upload Progress</span>
          <span>25%</span>
        </div>
        <ProgressBar value={25} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>Processing</span>
          <span>60%</span>
        </div>
        <ProgressBar value={60} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>Complete</span>
          <span>100%</span>
        </div>
        <ProgressBar value={100} />
      </div>
    </div>
  ),
};
