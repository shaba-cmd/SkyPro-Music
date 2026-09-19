import { ButtonHTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';
import styles from './button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export default function Button({
  children,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={cn(styles.modal__btnEnter, className)}
    >
      {children}
    </button>
  );
}
