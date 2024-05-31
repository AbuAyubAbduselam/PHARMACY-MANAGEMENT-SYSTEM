import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .drug-data {
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 9rem;
    font-weight: bold;
  }

  div > span {
    font-weight: 400;
    margin-left: 3rem;
    text-transform: none;
  }

  .clmn-1,
  .clmn-2 {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
  .status {
    padding: 0.3rem 1rem;
    border-radius: 0.9rem;
    background-color: #4ccd99;
  }

  .available {
    background-color: #4ccd99;
  }
  .out-of-stock {
    background-color: #f7eedd;
  }
  .expired {
    background-color: #e72929;
  }
`;
export default Wrapper;
