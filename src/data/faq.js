import React from 'react';
import styled from "styled-components";

const FaqLayout = styled.main`
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

const faq = () => {
  return (
  <FaqLayout>
      <h7>FAQ</h7>
      <h4>What is the project about?</h4>
      <p> Our purpose was to promote the communities that work with 1Hive.
          We pulled the artists from each of the DAOs to make a unique NFT
          Profile Picture Project.  Each artist doing their vision of the 1Hive
           bee.
      </p>
      <h4>Why isn't there a roadmap</h4>
      <p>
          Our team doesn't like to make promises we can't keep to make sales.
        While it started as a pure Profile Picture Project, it is
        evolving to a governance token.  We are constantly looking for 
        new utilities for our NFT. Your votes will
         shape this project via:
          <a href="https://vote.nfbeez.xyz/#/" rel={"noreferrer"} target="_blank">
            <h5>vote.nfbeez.xyz</h5>
          </a>
      </p>
  </FaqLayout>
  );
};

export default faq;


