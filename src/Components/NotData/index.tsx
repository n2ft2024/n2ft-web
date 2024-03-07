import { autoWidthVW } from "@/Common"
import useTranslationLanguage from "@/hooks/useTranslationLanguage"
import styled from "styled-components"
import { FlexView, FlexViewCenter, FlexViewCenterColumn } from "../View"

export default function NotData(){
  const {t} = useTranslationLanguage()
  return <NotdataView>
    <Notdata src={'/images/nodata.png'}>
    </Notdata>
    <Title>{t('nodata')}</Title>
  </NotdataView>
}
const Title = styled.span`
  color:#7C789B;
  font-size: 14px;
  font-weight: 400;
`
const NotdataView = styled(FlexViewCenterColumn)`
  margin:${autoWidthVW(61)} 0;
  width:100%;
`
const Notdata = styled.img`
  height:245px;
`