
import styles from './index.less'
export default function LoadingPage() {
  return(
    <div className={styles.loadingView} style={{
      width:window.innerWidth,
      height:window.innerHeight
    }}>
      <img className={styles.loadingIcon} src='/images/loading1.png'/>
    </div>
  )
}