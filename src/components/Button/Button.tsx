import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** ボタンの見た目のスタイル */
  variant?: ButtonVariant;
  /** ボタンのサイズ */
  size?: ButtonSize;
  /** 全幅にするか */
  fullWidth?: boolean;
  /** ラベル左に表示するアイコン */
  iconStart?: ReactNode;
  /** ラベル右に表示するアイコン */
  iconEnd?: ReactNode;
  children: ReactNode;
}

/**
 * 基本ボタン。フォームやアクションに使用。
 * デザイントークン: Figma `Button` コンポーネント（node 2:62）に追従。
 */
export function Button({
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  iconStart,
  iconEnd,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? 'btn--full' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classes} {...rest}>
      {iconStart && <span className="btn__icon">{iconStart}</span>}
      <span className="btn__label">{children}</span>
      {iconEnd && <span className="btn__icon">{iconEnd}</span>}
    </button>
  );
}
