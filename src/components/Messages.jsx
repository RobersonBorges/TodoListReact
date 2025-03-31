import styles from "./Messages.module.scss";

export default function Messages({ type, message }) {
  if (!message) return null;

  return <p className={`${styles.message} ${styles[type]}`}>{message}</p>;
}
