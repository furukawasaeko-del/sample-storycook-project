import type { ReactNode } from 'react';
import './Card.css';

export interface CardProps {
  /** カード上部のタイトル */
  title?: string;
  /** カード下部に表示するアクション領域 */
  footer?: ReactNode;
  /** ボディに表示する子要素 */
  children: ReactNode;
}

/**
 * 情報をひとまとまりに見せるためのカード。
 */
export function Card({ title, footer, children }: CardProps) {
  return (
    <article className="card">
      {title && <header className="card__header">{title}</header>}
      <div className="card__body">{children}</div>
      {footer && <footer className="card__footer">{footer}</footer>}
    </article>
  );
}
