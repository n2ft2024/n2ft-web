import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import styled from 'styled-components'
const Notice = createContext({
  success:(msg:string)=>{},
  error:(msg:string)=>{},
  warning:(msg:string)=>{}
})

export function useNoticeContent(){
  return useContext(Notice)
}


const outAnimatedName = 'flipOutX'
const AnimatedType:any = {
  // IN:'animate__animated animate__fadeInDown animate__fast',
  // OUT:'animate__animated animate__fadeOutUp animate__faster'

  IN:'animate__animated animate__flipInX animate__fast',
  OUT:`animate__animated animate__${outAnimatedName} animate__faster`

}

enum MsgType {
  success,
  error,
  warning
}

export default function NoticeProvider({children}:any){
  const [show,setShow] = useState(false)
  const [type,setType] = useState(AnimatedType.IN)
  const [msg,setMsg] = useState('')
  const [msgType,setMsgType] = useState(MsgType.success)

  const timerRef = useRef<any>()

  useEffect(()=>{
    window.addEventListener("webkitAnimationEnd", function(e:any) {
      if (e.animationName == outAnimatedName){
        setShow(false)
        setType(AnimatedType.IN)
        timerRef.current && clearTimeout(timerRef.current)
      }
  })
  },[])
  function showMessage(msg:string){
    timerRef.current && clearTimeout(timerRef.current)
    setShow(true)
    setMsg(msg)
    timerRef.current = setTimeout(() => {
      setType(AnimatedType.OUT)
    }, 3000);
  }
  return <Notice.Provider value={{
    success:(msg:string)=>{
      setMsgType(MsgType.success)
      showMessage(msg)
    },
    error:(msg:string)=>{
      setMsgType(MsgType.error)
      showMessage(msg)
    },
    warning:(msg:string)=>{
      setMsgType(MsgType.warning)
      showMessage(msg)
    }
  }}>
    {children}
    {show && <ModalView className={type} style={{
      background:msgType == MsgType.success ? '#53B455' : msgType == MsgType.error ? '#EA3323' : '#FCEC60'
    }}>
      <Icon src={msgType == MsgType.success ? './images/success.png' : msgType == MsgType.error ? './images/error.png' : './images/warning.png'}/>
      <div>{msg}</div>
    </ModalView>}
  </Notice.Provider>
}
const Icon = styled.img`
  width:24px;
  height:24px;
  margin-right:10px
`
const ModalView = styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;
  position:fixed;
  top:0;
  right:0;
  left:0;
  background:rgba(0,0,0,0.5);
  z-index:999;
  height:44px
`