import Avatar from '@fw-components/react/src/Avatar';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
};

export const Default = {
  args: {
    name: 'John Doe',
    size: 'md',
  },
};

export const WithImage = {
  args: {
    name: 'Jane Smith',
    src: 'https://i.pravatar.cc/150?img=1',
    size: 'md',
  },
};

export const Small = {
  args: {
    name: 'Alice Brown',
    size: 'sm',
  },
};

export const Large = {
  args: {
    name: 'Bob Wilson',
    size: 'lg',
  },
};

export const ExtraLarge = {
  args: {
    name: 'Charlie Davis',
    size: 'xl',
  },
};

export const AllSizes = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="Small" size="sm" />
      <Avatar name="Medium" size="md" />
      <Avatar name="Large" size="lg" />
      <Avatar name="Extra Large" size="xl" />
    </div>
  ),
};

export const Group = {
  render: () => (
    <div className="flex -space-x-2">
      <Avatar name="User 1" src="https://i.pravatar.cc/150?img=1" size="md" />
      <Avatar name="User 2" src="https://i.pravatar.cc/150?img=2" size="md" />
      <Avatar name="User 3" src="https://i.pravatar.cc/150?img=3" size="md" />
      <Avatar name="User 4" src="https://i.pravatar.cc/150?img=4" size="md" />
    </div>
  ),
};
