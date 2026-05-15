import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/REPLACE_ME/Design-System?node-id=3%3A6',
    },
  },
  args: {
    label: 'メールアドレス',
    placeholder: 'you@example.com',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelper: Story = {
  args: {
    helperText: '会社のドメインを使ってください。',
  },
};

export const WithError: Story = {
  args: {
    value: 'invalid',
    error: 'メールアドレスの形式が正しくありません。',
  },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'you@example.com' },
};
