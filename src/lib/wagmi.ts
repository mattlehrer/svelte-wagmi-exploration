import { chain, Connector, createClient, defaultChains, InjectedConnector } from '@wagmi/core';
// import { CoinbaseWalletConnector } from '@wagmi/core/connectors/coinbaseWallet';
// import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect';
import { providers } from 'ethers';

// Get environment variables
const alchemyId = import.meta.env.VITE_PUBLIC_ALCHEMY_ID as string;
const etherscanApiKey = import.meta.env.VITE_PUBLIC_ETHERSCAN_API_KEY as string;
const infuraId = import.meta.env.VITE_PUBLIC_INFURA_ID as string;

// Pick chains
const chains = defaultChains;
const defaultChain = chain.mainnet;

// Set up connectors
const connectors = () => {
	// const rpcUrl = chain.mainnet.rpcUrls[0] ?? defaultChain.rpcUrls[0];
	return [
		new InjectedConnector({ chains, options: { shimDisconnect: true } }),
		// new WalletConnectConnector({
		// 	chains,
		// 	options: {
		// 		infuraId,
		// 		qrcode: true,
		// 	},
		// }),
		// new CoinbaseWalletConnector({
		// 	chains,
		// 	options: {
		// 		appName: 'wagmi',
		// 		jsonRpcUrl: `${rpcUrl}/${infuraId}`,
		// 	},
		// }),
	];
};

// Set up providers
type ProviderConfig = { chainId?: number; connector?: Connector };
const isChainSupported = (chainId?: number) => chains.some((x) => x.id === chainId);

const provider = ({ chainId }: ProviderConfig) =>
	providers.getDefaultProvider(isChainSupported(chainId) ? chainId : defaultChain.id, {
		alchemy: alchemyId,
		etherscan: etherscanApiKey,
		infura: infuraId,
	});
const webSocketProvider = ({ chainId }: ProviderConfig) =>
	isChainSupported(chainId) ? new providers.InfuraWebSocketProvider(chainId, infuraId) : undefined;

export const wagmiClient = createClient({
	connectors,
	provider,
	webSocketProvider,
});
