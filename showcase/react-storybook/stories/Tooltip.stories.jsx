import Tooltip from '@fw-components/react/src/Tooltip';
import Button from '@fw-components/react/src/Button';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
  },
};

export const Default = {
  render: (args) => (
    <Tooltip content="This is a tooltip" {...args}>
      <Button title="Hover me" />
    </Tooltip>
  ),
};

export const Top = {
  render: () => (
    <Tooltip content="Tooltip on top" position="top">
      <Button title="Top" />
    </Tooltip>
  ),
};

export const Right = {
  render: () => (
    <Tooltip content="Tooltip on right" position="right">
      <Button title="Right" />
    </Tooltip>
  ),
};

export const Bottom = {
  render: () => (
    <Tooltip content="Tooltip on bottom" position="bottom">
      <Button title="Bottom" />
    </Tooltip>
  ),
};

export const Left = {
  render: () => (
    <Tooltip content="Tooltip on left" position="left">
      <Button title="Left" />
    </Tooltip>
  ),
};

export const AllPositions = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-20">
      <Tooltip content="Top" position="top">
        <Button title="Top" />
      </Tooltip>
      <Tooltip content="Right" position="right">
        <Button title="Right" />
      </Tooltip>
      <Tooltip content="Bottom" position="bottom">
        <Button title="Bottom" />
      </Tooltip>
      <Tooltip content="Left" position="left">
        <Button title="Left" />
      </Tooltip>
    </div>
  ),
};

export const LongContent = {
  render: () => (
    <Tooltip content="This is a much longer tooltip with more detailed information that wraps across multiple lines.">
      <Button title="Long tooltip" />
    </Tooltip>
  ),
};
