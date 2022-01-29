import { useEffect, useState } from "react";
import { ethers } from "ethers";
import styled from "styled-components";
import { Button } from "../Button";
import NFT from "../../utils/NFT.json";
import useStore from "../../store";
import { contractAddress } from "../../data/contract";
import { networkChainId } from "../../data/network";
import axios from 'axios';

const Notification = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(p) => p.theme.colors.creamLightest + 40};
  border-radius: 16px;
  padding: 1rem;
  p {
    margin: 0 0 .5rem 0;
  }
`;

const Mint = styled.form`
  background: ${(p) => p.theme.colors.rainbow};
  border-radius: 50px;
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin: 0;

  /* @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    width: 100%;
  } */
`;

const MintNumInput = styled.input.attrs((props) => ({
  type: "number",
}))`
  max-width: 7rem;
  border-radius: 50px 0px 0px 50px;
  outline: none;
  padding: 0.75rem 1rem;
  border: solid 2px ${(p) => p.theme.colors.salmonLight};
  placeholder {
    font-family: "Ubuntu", sans-serif;
  }
  :hover,
  :active,
  :focus {
    outline: none;
    border: solid 2px ${(p) => p.theme.colors.salmonBase};
  }
  margin-right: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    padding: 0.5rem 0.75rem;
    font-weight: 400;
    white-space: nowrap;
    margin-right: 0.5rem;
    width: 75px;
  }
`;

const MintButton = styled(Button)`
  border-radius: 50px 50px 50px 50px;
  padding: 0.75rem 1.5rem;
  background-color: ${(p) => p.theme.colors.greenBase};
  :hover {
    background-color: ${(p) => p.theme.colors.greenLight};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    padding: 0.6rem 0.5rem;
    font-weight: 400;
    white-space: nowrap;
  }
`;

const Minter = ({ mintTotal }) => {
  const addNFTNum = useStore((state) => state.addNFTsToMint);
  const [numToMint, setNumToMint] = useState(1);
  const [loading, setLoading] = useState(false);
  const [nftMinted, setNFTMinted] = useState(false);
  const [txn, setTxn] = useState();
  const [totalMinted, setTotalMinted] = useState(1);

  const [currentAccount, setCurrentAccount] = useState("");

  let display = [];
  //nader
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  const [nftData, setNftData] = useState([]);
  
  const handleChange = (e) => {
    setNumToMint(e.target.value);
    addNFTNum(e.target.value);
  };

  /*
  useEffect(() => {
    const setupEventListener = async () => {
      try {
        const { ethereum } = window;

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const connectedContract = new ethers.Contract(
            contractAddress,
            NFT.abi,
            signer
          );
          
          //update minted totals
          

          //Testing Wallet event for exclusive events
          // const accounts = await ethereum.request({ method: "eth_accounts" });
          //console.log("account from event", accounts[0]);
          // This will essentially "capture" our event when our contract throws it.
          connectedContract.on("MintedNFT", (from) => {
            console.log("from", from);
              setNFTMinted(true);
          });
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    setupEventListener();
  }, []);
*/

  const loadNFTs = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
            contractAddress,
            NFT.abi,
            signer
          );

        const accounts = await ethereum.request({ method: "eth_accounts" });
         // console.log("accounts", accounts);
          const account = accounts.toString();
          
        const data = await connectedContract.walletOfOwner(account) //need wallet address here
          console.log("data", data);
         // let big = data[0].toNumber();
        //  console.log("data[0]", data[0]);
         // console.log("big", big);
          let converted = [];
          for (let i = 0; i< data.length; i++){
            let bigNum = data[i].toNumber();
           converted.push(bigNum);
          //console.log("converted", converted);
          console.log("bigNum", bigNum);
          }
         // display = data;
         setNfts(converted);
          console.log("setNFTs", nfts);
          //map over things

          //const items = await Promise.all(data.map(async i => {
          let items = await Promise.all(nfts.map (async n => {

              const tokenUri = await connectedContract.tokenURI(n);
              //console.log("uri", tokenUri);
              const theFetch = await fetch(tokenUri);
              //console.log("theFetch", theFetch);
              const theJson = await theFetch.json();
              console.log("theJson return:", theJson);
              console.log("JSON Name", theJson.name);
              console.log("JSON Attributes:", theJson.attributes);

              /*
              theFetch.then(response => {
              //console.log(response, "the response");
              return response.json();
               }).then(tokenIds => {
              const item = {
                Name: tokenIds.name,
                Image: tokenIds.image,
                Attributes: tokenIds.attributes,
              }
              //console.log("the token IDs:", tokenIds);
              //console.log("tokenID name:", tokenIds.name);
              //console.log("tokenID image", tokenIds.image);
              //console.log("tokenID attributes", tokenIds.attributes);
              //console.log("item", item)
              return item;
              });  */
              return theJson;
          }));

          setNftData(items);
          console.log("NFT DATA:", nftData);

          // finish of the mapping
      } else {
          console.log("Ethereum object doesn't exist!");
        }
    } catch (error) {
      console.log(error);
      }
  }

  const mintTokens = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          contractAddress,
          NFT.abi,
          signer
        );
        
        const accounts = await ethereum.request({ method: "eth_accounts" });
        
        if (accounts.length !== 0) {
          const account = accounts[0];
        //  console.log("Found an authorized account:", account);
          setCurrentAccount(account);
        }else {
          console.log("No authorized account found");
        }

        const network = await provider.getNetwork();
        
        const chainId = network.chainId; 
        //hardcoded for rinkeby
        //if not on chain break / return the function
        if (chainId !== 100) {
          alert('Please make sure you are on Rinkeby Network');
          return;
        };

        if (totalMinted === 3333) {
          alert('Sold Out!');
          return;
        };

        console.log("Going to pop wallet now to pay gas...");
        let payment = String(numToMint * 0.01); //VERIFY!
        let totalGas
        if(numToMint < 2) {
          totalGas = String(numToMint * 2400000);
        }else{
          totalGas = String(4085000);
        }
        let nftTxn = await connectedContract.mint(numToMint, {
          gasLimit: totalGas,
          value: ethers.utils.parseEther(payment),
        });
        setLoading(true);
        setNFTMinted(false);
        console.log("Mining...please wait.");
        await nftTxn.wait();
        setLoading(false);
        setTxn(nftTxn.hash);
        let newCount = await connectedContract.totalSupply();
        setTotalMinted(newCount.toNumber());
        setNFTMinted(true); // testing removing mint
        console.log(
             `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`  //rinkeby
            // `Mined, see transaction: https://blockscout.com/xdai/mainnet/tx/${nftTxn.hash}` //xdai
           //  `Mined, see transaction: https://blockscout.com/poa/sokol/tx/${nftTxn.hash}` //sokol
        );
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const mintsSoFar = async () => {
      try {
        const { ethereum } = window;

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const connectedContract = new ethers.Contract(
            contractAddress,
            NFT.abi,
            signer
          );

          let totalMints = await connectedContract.totalSupply();
          setTotalMinted(totalMints.toNumber());
          console.log("Mints so far:", totalMints.toNumber());
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    mintsSoFar();
  }, []);

/*
<div>    
           {nfts.map(nft => <img src={`https://nfbeez.mypinata.cloud/ipfs/QmUaHNzF65Hzx2Nro2TnuksKeaRmvKHtHpLLoy3GxLtiUD/${nft}.png`}></img>) }                                 
        </div>
      */

  return (
    <>
      
      {!nftMinted && (
       <>
        <Mint>
          <MintButton onClick={loadNFTs}>Load NFTs</MintButton>
        </Mint>
        <br/>
        <>
        <Notification>
        <div>
          {nftData.map(nftd => 
            <div>
              <img src={nftd.image}></img> 
              <p>{nftd.name}</p>
            </div>
              )}
        </div>
        </Notification>
        </>

      </>
      )}
    </>
  );
};

export default Minter;
