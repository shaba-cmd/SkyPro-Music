import styles from './button.module.css';

export default function Button({ children }: { children: string }) {
  return <button className={styles.modal__btnEnter}>{children}</button>;
}
