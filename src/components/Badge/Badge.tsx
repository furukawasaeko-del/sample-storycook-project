import type { ReactNode } from 'react';
import './Badge.css';

export type BadgeTone = 'info' | 'success' | 'warning' | 'neutral';

export interface BadgeProps {
  /** バッジの意味づけ */
  tone?: BadgeTone;
  children: ReactNode;
}

/**
 * ステータス・タグ表示用の小さなバッジ。
 */
export function Badge({ tone = 'neutral', children }: BadgeProps) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}
