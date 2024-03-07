import styled from "styled-components";
import React, { createContext, useContext, useState } from "react";
import { animated, useSpring } from "react-spring";
import { useNetwork } from "wagmi";
import { isBrowser } from "react-device-detect"
import { formatAccount } from "@/Common";
import { ChainID, getScanLink, getScanName } from "@/Contract/chains";
import useTranslationLanguage from "@/hooks/useTranslationLanguage";

export enum LoadingType {
  confirm = 0,
  pending = 1,
  error = 2,
  success = 3
}
export const LoadingContext = createContext({
  show: (type: LoadingType, message: string, hash?: string) => {

  },
  hide: () => { }
})
export function useLoadingContext() {
  const loadingContext = useContext(LoadingContext)
  return loadingContext
}
export default function LoadingProvider({ children }: any) {
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState(0)
  const [message, setMessage] = useState("")
  const [hash, setHash] = useState("")
  return (
    <LoadingContext.Provider
      value={{
        show: (type, message, hash) => {
          setType(type)
          setMessage(message)
          setHash(hash || "")
          setVisible(true)
        },
        hide: () => {
          setVisible(false)
        }
      }}
    >
      {children}
      <Loading
        visible={visible}
        type={type}
        message={message}
        hash={hash}
        onClose={() => setVisible(false)}
      ></Loading>
    </LoadingContext.Provider>
  )
}

function Loading({ visible, type, message, hash, onClose }: any) {
  const { chain = { id: 1 } } = useNetwork()
  const { t } = useTranslationLanguage()
  const LoadingConfig: any = {
    [LoadingType.confirm]: {
      icon: '/images/Confirm.png',
      color: "#EF8339",
      title: t('conirm'),
      closeIcon: '/images/close.png',
    },
    [LoadingType.pending]: {
      icon: '/images/Waiting.png',
      color: "#EF8339",
      title: t('transation'),
      closeIcon: '/images/close.png',
    },
    [LoadingType.error]: {
      icon: '/images/Fail.png',
      color: "#E33D3D",
      title: t('Fail'),
      closeIcon: '/images/close.png',
    },
    [LoadingType.success]: {
      icon: '/images/MSuccess.png',
      color: "#0FA44D",
      title: t('success'),
      closeIcon: '/images/close.png',
    }
  }
  if (!visible) {
    return null;
  }
  return (
    <ModalView className="animate__animated animate__fadeIn animate__faster">
      <LoadingContent className="animate__animated animate__slideInUp animate__faster">
        <FlexViewBetween>
          <Titlehint>
            {t('hint')}
          </Titlehint>

          <Image onClick={onClose} src={LoadingConfig[type].closeIcon} />
        </FlexViewBetween>
        <ProviderContent>
          <div>
            {(type === LoadingType.confirm || type === LoadingType.pending) && <RotateImage icon={LoadingConfig[type].icon}></RotateImage>}
            {(type === LoadingType.success || type === LoadingType.error) && <StatusIcon src={LoadingConfig[type].icon}></StatusIcon>}
          </div>
          <LoadingTitle
            style={{ color: LoadingConfig[type].color }}
          >
            {LoadingConfig[type].title}
          </LoadingTitle>
          <DescContainer>
            {(type === LoadingType.confirm || type === LoadingType.error) && <LoadingDesc>
              {message}
            </LoadingDesc>}
            {(type === LoadingType.pending || type === LoadingType.success) && <LoadingDesc>
              Transaction Hash: {formatAccount(hash || message)}
            </LoadingDesc>}
            {(type !== LoadingType.confirm) && <HashViewBox
              onClick={() => {
                window.open(getScanLink(chain.id, hash || message, "transaction"))
              }}>
              <LoadingHashView >
                ViewOn {getScanName(chain.id)}
              </LoadingHashView>
              <RightImg src="/images/sort_right.png" />
            </HashViewBox>

            }
            {type === LoadingType.confirm && <LoadingTips>
  {t('Confirm this transaction in your wallet')}
            </LoadingTips>}
          </DescContainer>
        </ProviderContent>

      </LoadingContent>
    </ModalView>
  )
}
function RotateImage({ icon }: any) {
  const styles = useSpring({
    loop: true,
    from: { rotateZ: 0 },
    to: { rotateZ: 360 },
    config: {
      duration: 1500,
    },
  })

  return (
    <StatusIcon
      style={{ ...styles }}
      src={icon}
    ></StatusIcon>
  )
}
const HashViewBox = styled.div`
display: flex;
margin-top: 15px;
text-align: center;
justify-content: center;
align-items: center;
width:100%;
@media (max-width: 768px) {
  margin-top:0
}
`
const RightImg = styled.img`
width: 18px;
height: 18px;
margin-left:6px;
@media (max-width: 768px) {
  width: 12px;
  height: 12px;
}
`

const ProviderContent = styled.div`
margin: auto;
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Titlehint = styled.div`
color: var(--Gray-Title, #202020);
font-family: PingFangHK;
font-size: 24px;
font-style: normal;
font-weight: 500;
line-height: 36px; /* 150% */
@media (max-width: 768px) {
  font-size: 16px;
}
`
const Image = styled.img`
  width: 33px;
  height: 33px;
  @media (max-width: 768px) {
    width: 22px;
    height: 22px;
  }
`
const FlexViewBetween = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom:1px solid #E5E5E5;
  padding-bottom:16px;
  @media (max-width: 768px) {
    padding-bottom:10px;

  }
`
const FlexView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const LoadingContent = styled.div`
  width:502px;
  padding:24px 28px 26px;
  position:relative;
  background-color: #fff;
  border-radius: 20px;
  @media (max-width: 768px) {
    width:335px;
    padding:16px 12px 24px;
    border-radius: 10px
  };
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
`
const LoadingTitle = styled.div`
  font-size: 24px;
  font-family: Poppins;
  font-weight: 600;
  color: #202020;
  margin-top:26px;
  @media (max-width: 768px) {
    font-size: 14px;
 margin-top:15px
  }
`
const DescContainer = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items: flex-start;
  font-size: 36px;
  flex-wrap:wrap;
  overflow: hidden;
  width:100%;
  @media (max-width: 768px) {
    font-size:18px
  }
`
const LoadingDesc = styled.div`
  font-size: 18px;
  font-family: Poppins;
  font-weight: 400;
  color: #202020;
  margin:26px 0 12px;
  text-align:center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  width: 100%;

  @media (max-width: 768px) {
    font-size:16px;
    margin-top:13px
  };
`
const LoadingTips = styled.div`
  font-size:20px;
  font-weight: 400;
  color: #000;
  margin-top:15px;
  opacity:0.8;
  width:100%;
  text-align:center;
  @media (max-width: 768px) {
    font-size: 14px;
    margin-top:0
  }
`
const LoadingHashView = styled.div`
  font-size:14px;
  color:#90949A;
  cursor:pointer;
 font-weight:400;
text-align:center;
  @media (max-width: 768px) {
    font-size:12px
  }
`
const StatusIcon = styled(animated.img)`
  width:112px;
  height:auto;
  @media (max-width: 768px) {
    width:80px
  }
`

const ModalView = styled.div`
  position:fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background-color:rgba(0,0,0,0.7);
  z-index:999999999;
  display:flex;
  align-items:center;
  justify-content:center;
`
