import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .drug-data {
    position: relative;
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    display: flex;
    width: 80%;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    font-weight: bold;
  }

  div > span {
    font-weight: 400;
    margin-left: 10px;
    margin-top: 2rem;
    text-transform: none;
  }

  .clmn-1 {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
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
  .idd {
    width: 400px;
  }

  .drug-id {
    background-color: var(--text-secondary-color);
    padding: 5px 8px;
    border-radius: 2px;
    font-size: 10px;
    font-style: italic;
    font-weight: 70;
  }
  .copy-icon {
    color: #adbac9;
    cursor: pointer;
  }

  .copy-message {
    position: absolute;
    left: 19 rem;
    top: -18px;
    width: 500px;
    height: 100px;
    font-size: 0.7rem;
    font-weight: 200;
  }
  .Available {
    background-color: #4ccd99;
  }
  .Out-of-stock {
    background-color: #ff9f66;
  }
  .Expired {
    background-color: #e72929;
  }

  @media (max-width: 770px) {
    .drug-data {
      flex-direction: column;
    }
    .drug-id {
      font-size: xx-small;
    }
  }
`;
export default Wrapper;
