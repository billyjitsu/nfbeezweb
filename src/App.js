import styled from "styled-components";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Layout from "./components/Layout";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ArtistGallery from "./components/ArtistGallery";
import Minter from "./components/web3/Minter";
import useStore from "./store";
import NFT from "./utils/NFT.json";
import { contractAddress } from "./data/contract";
import { HelperText } from "./components/HelperText";
import Larva from "./assets/bees/larva.gif";
import Flow from "./assets/bees/test.png";

const Main = styled.main`
  padding: clamp(0.5rem, 2rem, 4rem);
  section {
    margin-bottom: 4rem;
    :last-of-type {
      margin-bottom: 0;
    }
    @media (max-width: ${(props) => props.theme.breakpoints.s}) {
      max-width: 100%;
      padding: 0.5rem;
      margin-bottom: 1rem;
    }
  }
  p {
    width: clamp(50ch, 50%, 60ch);
    max-width: 100%;
    word-break: break-word;
  }
`;

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    text-align: center;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    padding: 0.5rem;
  }
`;

const App = () => {
  let mintTotal = useStore((state) => state?.nftsToMint);
 // const [totalMinted, setTotalMinted] = useState(1);
/*
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
*/
  return (
    <Layout>
      <Nav focusMinter />
      <Main>
        <Hero>
        <h1>NFBeez</h1>
          <p>
            <img src={Flow} alt="Larva" width="200" />
            <br />
            A Collection of unique animated bees from the community artists at 1Hive, Agave,
            BrightID, TEC, Shapeshift and Gitcoin
            <br />
            <br />
            <strong>Mint yours now for only 33 xDai</strong>
          </p>
          <Minter id="minter" mintTotal={mintTotal} />
          {mintTotal < 1 && (
            <HelperText>Please mint at least 1 nft.</HelperText>
          )}
          {mintTotal > 25 && (
            <HelperText error>
              Gas fees will be very high for more than 25 nfts. <br />
              Please mint 25 nfts at a time at most, as contract will deny higher.
            </HelperText>
          )}
        </Hero>
        <ArtistGallery />
      </Main>

      <Footer />
    </Layout>
  );
};

export default App;
