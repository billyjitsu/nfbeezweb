import styled from "styled-components";
import { artists } from "../data/artists";
import { Button } from "./Button";
import Bee from "../assets/bees/artist1.png";

const Gallery = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  grid-gap: 30px;
  margin-bottom: 32 px;
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    grid-template-columns: fit-content(50%) fit-content(50%);
    grid-gap: 50px;
    place-items: center center;
  }
`;

const Title = styled.h2`
  width: 100%;
  display: block;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  text-align: center;
`;

const Card = styled.article`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2rem;
  border-radius: 16px;
  max-width: 800px;
  background: ${(p) => p.theme.colors.white};
  margin: 1rem;
  box-shadow: ${(p) => p.theme.boxShadow.low};
  :hover {
    box-shadow: ${(p) => p.theme.boxShadow.medium};
  }
  img {
    padding: 25px;
    width: 18rem;
  }
  a {
    color: ${(p) => p.theme.colors.greyMedium};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    align-items: center;
    padding: 2rem;
    margin: 0 0 1rem 0;
    flex-direction: column-reverse;
    max-width: 85%;
    img {
      width: 10rem;
    }
  }
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    width: 85%;
    margin: 0 0.5rem 2rem 0.5rem;
    padding: 2rem 2rem 2rem 2rem; 
    border-radius: 45px;
  }
`;

const ArtistInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  h3 {
    margin: 0;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    align-items: center;
    padding: 1rem;
    h3 {
      margin-top: 1rem;
    }
    p {
      width: 100%;
    }
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }
`;

const ArtistLinks = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  button {
    :first-of-type {
      margin-right: 1rem;
    }
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column;
    button {
      width: 100%;
      margin-right: 0;
      :first-of-type {
        margin-bottom: 0.5rem;
      }
    }
  }
`;

const ArtistGallery = () => {
  return (<>
  <Title>The Artists Behind The Project</Title>
    <Gallery>
      {artists.length !== 0 &&
        artists.map((data) => (
          <Card key={data.name + data.community}>
            <ArtistInfo>
              <h3>{data.name}</h3>
              <a href={data.communityUrl} rel={"noreferrer"} target="_blank">
                {data.community}
              </a>
              <p>{data.bio}</p>
              <ArtistLinks>
                <a
                  href={data.marketplaceUrl}
                  rel={"noreferrer"}
                  target="_blank"
                >
                  <Button secondary>Marketplace</Button>
                </a>
                <a href={data.communityUrl} rel={"noreferrer"} target="_blank">
                  <Button secondary>Community</Button>
                </a>
              </ArtistLinks>
            </ArtistInfo>
            <img src={data.bee} alt={`${data.name}'s best bee`} />
          </Card>
        ))}
    </Gallery>
    </>
  );
};

export default ArtistGallery;
