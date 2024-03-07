import style from './style.module.scss'
export default function PageLoading(){
  return <div className='page_loading'>
    <span className={style.text_flicker_in_glow}>APP NAME</span>
  </div>
}