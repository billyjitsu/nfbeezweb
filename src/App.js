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

  return (
    <Layout>
      <Nav focusMinter />
      <Main>
        <Hero>

          <p>
            <img src={Flow} alt="Larva" width="400" />
            <br />
            Brought to you by the NFBeez Team <br/>
            A Collection of unique animated bees from the community artists at 1Hive, Agave,
            BrightID, GUStakes, TEC, Shapeshift, xDai punks and Gitcoin
            <br />
            <br />
            <strong>See your Tigers</strong>
          </p>
          <Minter id="minter" mintTotal={mintTotal} /> 
        
        </Hero>
        
      </Main>

      <Footer />
    </Layout>
  );
};

export default App;
