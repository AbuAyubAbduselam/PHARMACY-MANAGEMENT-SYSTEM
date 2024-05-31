import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .top-topic {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 3rem 1rem;
    background-color: "white";
  }

  .drugs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 1120px) {
    .drugs {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }
`;
export default Wrapper;
