import { InjectedConnector } from "wagmi/connectors/injected";
const IntoWallet = ({
                    chains,
                    shimDisconnect
                }:any) => ({
    id: "injected",
    name: "INTO Wallet",
    iconUrl: '/images/wallets/icon_wallet_into.png',
    iconBackground: '#0c2f78',
    createConnector: () => ({
        connector: new InjectedConnector({
            chains,
            options: { shimDisconnect }
        })
    })
});
export default IntoWallet
