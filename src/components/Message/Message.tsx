import cn from 'classnames';
import styles from './message.module.css';

type MessageProps = {
  text: string;
  isError?: boolean;
};

export default function Message({ text, isError = false }: MessageProps) {
  return (
    <p
      className={cn(styles.message, { [styles.error]: isError })}
      role="status"
    >
      {text}
    </p>
  );
}
