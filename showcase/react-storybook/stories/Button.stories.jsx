import Button from '@fw-components/react/src/Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outline', 'ghost'],
    },
    theme: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    mode: {
      control: 'select',
      options: ['text', 'icon'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export const Primary = {
  args: {
    title: 'Primary Button',
    variant: 'filled',
    theme: 'primary',
    size: 'md',
  },
};

export const Secondary = {
  args: {
    title: 'Secondary Button',
    variant: 'filled',
    theme: 'secondary',
    size: 'md',
  },
};

export const Outline = {
  args: {
    title: 'Outline Button',
    variant: 'outline',
    theme: 'primary',
    size: 'md',
  },
};

export const Ghost = {
  args: {
    title: 'Ghost Button',
    variant: 'ghost',
    theme: 'primary',
    size: 'md',
  },
};

export const Success = {
  args: {
    title: 'Success',
    variant: 'filled',
    theme: 'success',
    size: 'md',
  },
};

export const Danger = {
  args: {
    title: 'Danger',
    variant: 'filled',
    theme: 'danger',
    size: 'md',
  },
};

export const Warning = {
  args: {
    title: 'Warning',
    variant: 'filled',
    theme: 'warning',
    size: 'md',
  },
};

export const Small = {
  args: {
    title: 'Small Button',
    size: 'sm',
    variant: 'filled',
    theme: 'primary',
  },
};

export const Large = {
  args: {
    title: 'Large Button',
    size: 'lg',
    variant: 'filled',
    theme: 'primary',
  },
};

export const Disabled = {
  args: {
    title: 'Disabled Button',
    disabled: true,
    variant: 'filled',
    theme: 'primary',
  },
};

export const WithIcon = {
  args: {
    title: 'Button with Icon',
    icon: 'Plus',
    variant: 'filled',
    theme: 'primary',
  },
};

export const Loading = {
  args: {
    title: 'Loading Button',
    variant: 'filled',
    theme: 'primary',
    onClick: () => new Promise(resolve => setTimeout(resolve, 2000)),
  },
};
