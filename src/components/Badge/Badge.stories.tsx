import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/ieBEAGG10XDZewgnWVlau7/%E7%84%A1%E9%A1%8C?node-id=1-3&t=FBapVmZReECd495l-4',
    },
  },
  argTypes: {
    tone: {
      control: 'radio',
      options: ['info', 'success', 'warning', 'neutral'],
    },
  },
  args: {
    children: 'NEW',
    tone: 'info',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};
export const Success: Story = { args: { tone: 'success', children: 'DONE' } };
export const Warning: Story = { args: { tone: 'warning', children: 'BETA' } };
export const Neutral: Story = { args: { tone: 'neutral', children: 'DRAFT' } };

export const AllTones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Badge tone="info">INFO</Badge>
      <Badge tone="success">SUCCESS</Badge>
      <Badge tone="warning">WARNING</Badge>
      <Badge tone="neutral">NEUTRAL</Badge>
    </div>
  ),
};
