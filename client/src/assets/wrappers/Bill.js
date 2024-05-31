import styled from "styled-components";
import background from "../images/b11.png";

const Wrapper = styled.article`
  background: var(--background-secondary-color);
  position: relative; /* Required for positioning the ::before pseudo-element */
  border-radius: var(--border-radius);
  display: grid;
  margin: auto;
  grid-template-rows: 1fr;
  box-shadow: var(--shadow-2);
  z-index: 1;
  &::before {
    content: "";
    position: absolute;
    overflow: hidden;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(30deg); /* Combine translate and rotate */
    opacity: 0.7;
    width: 40%;
    height: 40%;
    background-image: url(${background});
    background-size: contain;
    background-position: right bottom;
    background-repeat: no-repeat;
  }

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
    border: 5px solid #f1f1f1;
    padding: 15px 6px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 1rem;
    margin: 1rem 1rem;
    flex: 1fr;
  }

  .action-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 4rem;
    margin-top: 2rem;
  }

  .edit-btn,
  .print-btn,
  .delete-btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media print {
    .no-print {
      display: none;
    }
  }
`;

export default Wrapper;
