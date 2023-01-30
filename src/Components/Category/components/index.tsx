import styled from "styled-components";

export const Container = styled.div`
  max-width: 1000px;
`;

export const CategoryContainer = styled.div`
  padding: 10px;
  border: 1px solid black;
  background: #bac8d3;
`;

export const BallotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
  margin: 10px 0px;
  @media (min-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
