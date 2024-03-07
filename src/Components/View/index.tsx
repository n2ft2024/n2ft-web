import { autoWidthVW, colors } from '@/Common'
import styled from 'styled-components'

export const WebView = styled.div`
  @media (max-width: 768px) {
    display: none;
  } ;
`

export const MobileView = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  } ;
`

export const FlexView = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

export const FlexViewCenter = styled(FlexView)`
  align-items: center;
  justify-content: center;
  width: 100%;
`
export const FlexViewEnd = styled(FlexView)`
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`
export const FlexViewBetween = styled(FlexView)`
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
export const FlexViewColumn = styled(FlexView)`
  display: flex;
  flex-direction: column;
  align-items:flex-start
`
export const FlexViewCenterColumn = styled(FlexViewColumn)`
  justify-content: center;
  align-items: center;
`
export const LinearView = styled(FlexView)`
  width:fit-content;
  background:-webkit-linear-gradient(bottom,#220A53,#3B166D);
  border-radius:${autoWidthVW(60)};
  padding:${autoWidthVW(60)} ${autoWidthVW(30)};
  @media (max-width: 768px) {
    border-radius:${autoWidthVW(30)};
    padding:${autoWidthVW(30)} ${autoWidthVW(15)};
  }
`
export const LinearBorderView = styled(FlexView)`
  width:fit-content;
  border:1px solid transparent;
  border-image:linear-gradient(to bottom,#E900FF,#00FFE5,#332062) 1 10;
  background:-webkit-linear-gradient(bottom,rgba(0,0,0,0.53),rgba(0,0,0,0.78));
`

export const SpaceWidth = styled.div<{
  width: number
  webWidth?: number
}>`
  width: ${({ webWidth, width }) => autoWidthVW(webWidth ?? width * 2)};
  @media (max-width: 768px) {
    width: ${({ width }) => autoWidthVW(width)};
  }
`
export const SpaceHeight = styled.div<{
  height: number
  webHeight?: number
}>`
  height: ${({ webHeight, height }) => autoWidthVW(webHeight ?? height * 2)};
  @media (max-width: 768px) {
    height: ${({ height }) => autoWidthVW(height)};
  }
`