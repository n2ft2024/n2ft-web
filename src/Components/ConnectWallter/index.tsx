import styles from './styles.module.scss'
import commonStyles from '../../Common/common.module.scss'
import { FlexView, FlexViewCenter } from '../View';
import { autoWidthVW, formatAccount } from '@/Common';
import useTranslationLanguage from '@/hooks/useTranslationLanguage';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { connect, disconnect } from '@wagmi/core'
import { bsc } from 'viem/chains';
import { useAccount } from 'wagmi';
import { Drawer } from 'antd';
import { useState } from 'react';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { SafeConnector } from 'wagmi/connectors/safe'


export default function ConnectWallet() {
  const { open, close } = useWeb3Modal()
  const { address } = useAccount()
  function onConnect() {
    open && open()
  }
  async function onCustomWallet() {
    const connectInfo = await connect({
      connector: new InjectedConnector({
        chains: [bsc],
        options: {}
      })
    })
    localStorage.setItem('wagmi.injected.shimDisconnect', "1")
  }
  async function onMetamask() {
    const connectInfo = await connect({
      connector: new MetaMaskConnector({
        chains: [bsc],
        options: {}
      })
    })
    localStorage.setItem('wagmi.injected.shimDisconnect', "1")
  }

  const { t } = useTranslationLanguage()
  return <div className={`${commonStyles.row} ${styles.walletView}`} onClick={onConnect}>
    <img className={styles.walletIcon} src='/images/walleticon.png' />
    <span className={styles.address}>{address ? formatAccount(address) : 'Connect Wallet'}</span>
  </div>
}


function PhoneMenu() {
  const [open, setOpen] = useState(false);
  function onShowMenu() {
    setOpen(!open);
  }
  return <>
    <img onClick={onShowMenu} className={styles.menuIcon} src='/images/menu.png' />
    <Drawer
      bodyStyle={{ padding: 0 }}
      // style={{marginTop:autoWidth(isMobile?60:120)}}
      z-index={10}
      placement={'left'}
      closable={false}
      onClose={onShowMenu}
      open={open}
      width={'50%'}
      maskClosable={true}
      key={'left'} >
    </Drawer>
  </>
}