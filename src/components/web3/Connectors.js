import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';


// literally all that is needed for metamask
export const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 100],
  })
////////////////////////////////////////////////////

// What's needed for walletConnect
//setup RPC URLS FOR EACH SUPPORTED NETWORK
const RPC_URLS = {
	1: 'https://mainnet.infura.io/v3/27e484dcd9e3efcfd25a83a78777cdf1',
	4: 'https://rinkeby.infura.io/v3/27e484dcd9e3efcfd25a83a78777cdf1',
	100: 'https://rpc.gnosischain.com'
};

// I'm using mainnet , rinkeby and xdai for example
export const walletconnect = new WalletConnectConnector({
	rpc: {
		1: RPC_URLS[1],
		4: RPC_URLS[4],
		100: RPC_URLS[100]
	},
    chainId: 4,
	qrcode: true,
	pollingInterval: 15000
});

//reset connection or it will stay connected
export function resetWalletConnector(connector) {
	if (connector && connector instanceof WalletConnectConnector) {
		connector.walletConnectProvider = undefined;
	}
}