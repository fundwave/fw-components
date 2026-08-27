import Input from '@fw-components/react/src/Input';

export default {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    theme: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    invalid: {
      control: 'boolean',
    },
  },
};

export const Default = {
  args: {
    placeholder: 'Enter text...',
    size: 'md',
    theme: 'secondary',
  },
};

export const WithLabel = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    type: 'email',
    size: 'md',
    theme: 'secondary',
  },
};

export const WithIcon = {
  args: {
    label: 'Search',
    icon: 'Search',
    placeholder: 'Search...',
    size: 'md',
    theme: 'secondary',
  },
};

export const Required = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    required: true,
    size: 'md',
    theme: 'secondary',
  },
};

export const WithError = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    invalid: true,
    errorMessage: 'Please enter a valid email address',
    size: 'md',
    theme: 'secondary',
  },
};

export const Disabled = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit',
    disabled: true,
    size: 'md',
    theme: 'secondary',
  },
};

export const Password = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    size: 'md',
    theme: 'secondary',
  },
};

export const Number = {
  args: {
    label: 'Amount',
    type: 'number',
    placeholder: '0',
    size: 'md',
    theme: 'secondary',
  },
};

export const Small = {
  args: {
    label: 'Small Input',
    placeholder: 'Small size',
    size: 'sm',
    theme: 'secondary',
  },
};

export const Large = {
  args: {
    label: 'Large Input',
    placeholder: 'Large size',
    size: 'lg',
    theme: 'secondary',
  },
};
