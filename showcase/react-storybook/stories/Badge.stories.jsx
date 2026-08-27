import Badge from '@fw-components/react/src/Badge';

export default {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
  },
};

export const Default = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
};

export const Secondary = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Destructive = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
};

export const Outline = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const WithCount = {
  render: () => (
    <div className="flex gap-4">
      <Badge>New 3</Badge>
      <Badge variant="secondary">Updates 12</Badge>
      <Badge variant="destructive">Errors 5</Badge>
    </div>
  ),
};

export const StatusBadges = {
  render: () => (
    <div className="flex gap-4">
      <Badge>Active</Badge>
      <Badge variant="secondary">Pending</Badge>
      <Badge variant="destructive">Inactive</Badge>
      <Badge variant="outline">Draft</Badge>
    </div>
  ),
};
