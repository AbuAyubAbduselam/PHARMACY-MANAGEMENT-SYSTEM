import styled from "styled-components";

const Wrapper = styled.section`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }

  .logo {
    width: 16rem;
  }

  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;

    span {
      color: var(--primary-300);
    }

    margin-bottom: 1.5rem;
  }
  p {
    line-height: 2;
    color: var(--primary-300);
    margin-bottom: 1.5rem;
    max-width: 35em;
  }
  .register-link {
    margin-right: 1rem;
  }

  .btn {
    padding: 0.75rem 1rem;
    border-radius: 1.5rem;
  }
  .log-cont {
    display: flex;
  }

  .user {
    cursor: pointer;
    color: var(--white);
    background: var(--primary-500);
    border: transparent;
    border-radius: 2rem;
    letter-spacing: var(--letter-spacing);
    margin-right: 3rem;
    padding: 0.75rem 2.5rem;
    box-shadow: var(--shadow-1);
    transition: var(--transition);
    text-transform: capitalize;
    display: inline-block;
    align-items: center;
  }
  .user:hover {
    background: var(--primary-700);
    box-shadow: var(--shadow-3);
  }
  .admin {
    position: absolute;
    top: 1.8rem;
    right: 3rem;
  }
  .menu-icon {
    position: absolute;
    top: 1.8rem;
    right: 3rem;
    display: none;
    cursor: pointer;
  }

  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 400px;
      column-gap: 3rem;
    }
  }

  @media (max-width: 600px) {
    .btn {
      display: none;
    }
    .menu-icon {
      display: block;
    }
  }
`;
export default Wrapper;
