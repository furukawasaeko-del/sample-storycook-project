import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import './Input.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 入力欄の上に出すラベル */
  label?: string;
  /** エラー時のメッセージ。指定するとエラー表示になる */
  error?: string;
  /** 補足説明 */
  helperText?: string;
}

/**
 * ラベル付きテキスト入力。
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, helperText, id, className, ...rest },
  ref,
) {
  const reactId = useId();
  const inputId = id ?? reactId;
  const describedById = error
    ? `${inputId}-error`
    : helperText
    ? `${inputId}-helper`
    : undefined;

  return (
    <div className={['input', error ? 'input--error' : '', className ?? ''].filter(Boolean).join(' ')}>
      {label && (
        <label className="input__label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className="input__field"
        aria-invalid={error ? true : undefined}
        aria-describedby={describedById}
        {...rest}
      />
      {error ? (
        <p id={`${inputId}-error`} className="input__error">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${inputId}-helper`} className="input__helper">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});
