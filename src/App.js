import styled from "styled-components";
import { useEffect, useState } from "react";
//import { ethers } from "ethers";
import Layout from "./components/Layout";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ArtistGallery from "./components/ArtistGallery";
import Minter from "./components/web3/Minter";
import useStore from "./store";
//import NFT from "./utils/NFT.json";
//import { contractAddress } from "./data/contract";
import { HelperText } from "./components/HelperText";
import Larva from "./assets/bees/banner.png";

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
  img {
    width: 16rem; 
  }
`;

const BannerContain = styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
  p {
    text-align: center;
  }
`;


const Banner = styled.img`

  justify-content:center;
  flex-direction: column;
  align-items: center;
  margin: 30px;
  @media (min-width: ${(props) => props.theme.breakpoints.xs}) {
    width: 250px;
  }
  @media (min-width: ${(props) => props.theme.breakpoints.s}) {
    width: 250px;
  }
  @media (min-width: ${(props) => props.theme.breakpoints.m}) {
    width 350px;
  }
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    width 500px;
  }
`;

const App = () => {
  let mintTotal = useStore((state) => state?.nftsToMint);

  return (
    <Layout>
      <Nav focusMinter />
      <Main>
        <BannerContain>
          <Banner src={Larva} alt="Larvae"/>
        </BannerContain>
        <Hero>
          <p>
            A Collection of unique animated bees from the community artists at 1Hive, Agave,
            BrightID, GUStakes, TEC, Shapeshift, xDai punks and Gitcoin
            <br />
            <br />
            <strong>Mint yours now for only 39 xDai</strong>
          </p>
          <h1>Coming Soon</h1>
        </Hero>
        <ArtistGallery />
      </Main>

      <Footer />
    </Layout>
  );
};

export default App;
