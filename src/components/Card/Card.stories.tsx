import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/REPLACE_ME/Design-System?node-id=2%3A4',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'お知らせ',
    children: 'これは基本的なカードのサンプルです。',
  },
};

export const WithFooter: Story = {
  args: {
    title: '新機能のご案内',
    children: (
      <p>
        新機能 <Badge tone="info">NEW</Badge> がリリースされました。
      </p>
    ),
    footer: (
      <>
        <Button variant="secondary">あとで</Button>
        <Button variant="primary">詳細を見る</Button>
      </>
    ),
  },
};

export const TextOnly: Story = {
  args: {
    children: 'ヘッダー・フッターなしのシンプルなカード。',
  },
};
