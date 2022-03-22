import { ethers } from "ethers";
import WalletConnectProvider from '@walletconnect/ethereum-provider';
import { Web3Provider } from '@ethersproject/providers';
import styled from "styled-components";
import { useState, useEffect } from "react";
import useStore from "../../store";
import { Button } from "../Button";
import { networkChainId } from "../../data/network";


const Address = styled.p`
  font-size: 1.2rem;
  margin-right: 1rem;
`;


const WalletAddress = () => {
  const [error, setError] = useState();
  const [account, setAccount] = useState();
  const [ web3Library, setWeb3Library ] = useState(); //Provider
  const [ walletConnectProvider, setWalletConnectProvider ] = useState();
  const [shortenedAddress, setShortenedAddress] = useState();
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const addAddress = useStore((state) => state.addWalletAddress);

  //on page load, check if user has metamask, and check if there is wallet address saved
  useEffect(() => {
    connectWalletHandler();
    //connectToXDai();
    addWalletListener();
   // accountChangeHandler();
    setAccount()
  }, []);

  
  //connects user to metamask to add address
  const connectWalletHandler = async () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangeHandler(result[0]);
        }
        );
    } else {
      setError(true);
      setAccount("null");
    }
  };

  const connectWalletConnect = async () => {
		try {
			const RPC_URLS = {
				4: 'https://rinkeby.infura.io/v3/55d040fb60064deaa7acc8e320d99bd4',
        100: 'https://rpc.gnosischain.com'
			};
			const provider = new WalletConnectProvider({
				rpc: {
					1: RPC_URLS[4],
					4: RPC_URLS[100]
				},
				qrcode: true,
				pollingInterval: 15000
			});
			setWalletConnectProvider(provider);
			const accounts = await provider.enable();
			const account = accounts[0];

			const library = new Web3Provider(provider, 'any');

			console.log('library', library);
			setWeb3Library(library);
			setAccount(account);
      console.log("account:",accounts)
		} catch (ex) {
			console.log(ex);
		}
	};

  const addWalletListener = async () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", connectWalletHandler );
      window.ethereum.on("chainChanged", reloadPage );
    }
  }

  const reloadPage = () => {
    window.location.reload();
  }

  const accountChangeHandler = async (newAccount) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setAccount(newAccount);
    console.log(newAccount, "account");
    addAddress(newAccount);
    //shortenAddress(newAccount);
    const network = await provider.getNetwork();
    const chainId = network.chainId;
    // Hardcoded for xdai - Hex value issues
    if (chainId !== 100) {
      setWrongNetwork(true);
    }
    if(newAccount !== undefined) {
    shortenAddress(newAccount);
    }else{
      return;
    }
  };
  
  //connects to the right network
  const connectToXDai = async () => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${networkChainId}` }],
      
    });
    setWrongNetwork(false);
  };

  const shortenAddress = async (newAccount) => {
    let startChunk = await newAccount.substring(0, 5);
    let endChunk = await newAccount.substring(newAccount.length - 5);
    setShortenedAddress(`${startChunk}...${endChunk}`);
  };

  return (
    <>
      {error &&
        account === "null" &&(
          <a
            href="https://metamask.io/download.html"
            rel={"noreferrer"}
            target="_blank"
          >
            <Button>Download Metamask</Button>
          </a>
        )}
      {!account && (
        <>
        <Button onClick={connectWalletHandler}>Connect Wallet</Button>
        <Button onClick={connectWalletConnect}>WalletConnect</Button>
        </>
      )}
      {wrongNetwork && <Button onClick={connectToXDai}>Connect to gnosis</Button>}
      {!wrongNetwork && shortenedAddress && (
        <Button>{shortenedAddress}</Button>
      )}
    </>
  );
};

export default WalletAddress;
