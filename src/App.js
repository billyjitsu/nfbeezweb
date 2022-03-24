import styled from "styled-components";
import Layout from "./components/Layout";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ArtistGallery from "./components/ArtistGallery";
import Minter from "./components/web3/Minter";
import useStore from "./store";
import Faq from "./data/faq";
import { HelperText } from "./components/HelperText";
import Larva from "./assets/bees/banner.png";
import { Web3Provider } from '@ethersproject/providers';  // for get Library function
import { Web3ReactProvider } from '@web3-react/core';

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

const getLibrary = (provider) => {
  const library = new Web3Provider(provider, 'any');
  library.pollingInterval = 15000;
  return library;
};

const App = () => {
  let mintTotal = useStore((state) => state?.nftsToMint);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
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
            <br />
            <strong>Limited hardware wallet support</strong>
          </p>
          <Minter id="minter" mintTotal={mintTotal} />
          {mintTotal < 1 && (
            <HelperText>Please mint at least 1 nft.</HelperText>
          )}
          {mintTotal > 25 && (
            <HelperText error>
              Please mint 25 nfts at a time at most, as contract will deny higher.
            </HelperText>
          )}
        </Hero>
        <ArtistGallery />
        <Faq/>
      </Main>

      <Footer />
    </Layout>
    </Web3ReactProvider>
  );
};

export default App;
