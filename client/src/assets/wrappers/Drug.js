import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  display: grid;
  grid-template-rows: 1fr;
  align-items: center;

  box-shadow: var(--shadow-2);
  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
  }
  .main-icon {
    width: 30px;
    height: 30px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--border-radius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    gap: 1rem;
    margin: 2rem 1rem;
    flex: 1fr;
  }

  .action-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    margin: 3rem 8rem 0rem 0rem;
    gap: 5rem;
  }

  .edit-btn,
  .delete-btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Wrapper;
