import styled from 'styled-components'
import { FlexView } from '../View'
function Background() {
  return <BackGroundView />
}
const BackGroundView = styled(FlexView)`
  position: fixed;
  background-position: center;
  background-image: url('');
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height:100%;
  @media (max-width: 768px) {
    background-image: url('');
  }
`
export default Background
