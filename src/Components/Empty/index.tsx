import styles from './index.module.scss'
export default function Empty() {
  return (
    <div className={styles.container}>
      <div className={styles.content}></div>
    </div>
  )
}