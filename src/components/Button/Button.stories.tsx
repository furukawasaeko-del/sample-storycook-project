import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// Figmaの reactjs-line アイコンと同じシルエットの簡易SVG。
// currentColorに追従するので、ボタンの文字色と同じ色で塗られる。
const ReactAtomIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ width: '100%', height: '100%' }}
  >
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <ellipse
      cx="12"
      cy="12"
      rx="10"
      ry="4.5"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <ellipse
      cx="12"
      cy="12"
      rx="10"
      ry="4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      transform="rotate(60 12 12)"
    />
    <ellipse
      cx="12"
      cy="12"
      rx="10"
      ry="4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      transform="rotate(120 12 12)"
    />
  </svg>
);

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    // ↓ Figmaフレーム/コンポーネントURLを貼ると、Storybook内に
    //   "Design" パネルが出てFigmaを横並びで確認できる。
    //   実プロジェクトでは自分のFigmaのURLに置き換える。
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/ieBEAGG10XDZewgnWVlau7/%E7%84%A1%E9%A1%8C?node-id=2-62&t=FBapVmZReECd495l-4',
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'danger'],
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    fullWidth: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'lg',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    iconStart: <ReactAtomIcon />,
    iconEnd: <ReactAtomIcon />,
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/ieBEAGG10XDZewgnWVlau7/%E7%84%A1%E9%A1%8C?node-id=2-195&t=FBapVmZReECd495l-4',
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    iconStart: <ReactAtomIcon />,
    iconEnd: <ReactAtomIcon />,
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/ieBEAGG10XDZewgnWVlau7/%E7%84%A1%E9%A1%8C?node-id=2-411&t=FBapVmZReECd495l-4',
    },
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    iconStart: <ReactAtomIcon />,
    iconEnd: <ReactAtomIcon />,
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/ieBEAGG10XDZewgnWVlau7/%E7%84%A1%E9%A1%8C?node-id=2-251&t=FBapVmZReECd495l-4',
    },
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button {...args} size="xs">XS</Button>
      <Button {...args} size="sm">SM</Button>
      <Button {...args} size="md">MD</Button>
      <Button {...args} size="lg">LG</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
};
