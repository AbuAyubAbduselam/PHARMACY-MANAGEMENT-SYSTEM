import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  .drug-data {
    margin-top: 0.6rem;
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    display: flex;
    flex-direction: column;
    gap: 2rem;
    font-weight: bold;
    padding-left: 2rem;
  }

  div > span {
    font-weight: 400;
    margin-left: 1rem;
    text-transform: none;
  }

  .ph-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid #240750;
  }

  .address {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .compName {
    margin: auto;
    font-size: 20px;
  }
  .bot {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .col-1,
  .col-2 {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    font-weight: bold;
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

  @media print {
    .drug-data {
      flex-direction: column;
    }
    .bot {
      flex-direction: row;
    }
  }
`;
export default Wrapper;
