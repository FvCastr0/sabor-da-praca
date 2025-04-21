import styled from "styled-components";
import { colors } from "./theme";

export const SalesTableStyles = styled.section`
  table {
    margin: auto;
    border-collapse: collapse;
    border: 1px solid ${colors.terciary};
    font-family: sans-serif;
    font-size: 0.8rem;
    letter-spacing: 1px;
    width: 50%;
    margin-top: 1rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1rem;
  }

  .header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 1rem;
  }

  .header a {
    text-decoration: none;
    color: ${colors.primary};
    font-weight: bold;
    font-size: 0.8rem;
    transition: all 0.3s ease-in-out;
    margin: 0 1rem;
    text-align: center;
  }

  .header a:hover {
    color: ${colors.terciary};
  }

  h1 {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    margin-top: 1rem;

    @media (max-width: 500px) {
      font-size: 1.2rem;
    }
  }

  thead {
    font-weight: bold;
  }

  th,
  td {
    border: 1px solid ${colors.terciary};
    padding: 8px 10px;
  }

  td:last-of-type {
    text-align: center;
  }

  .arrow-value {
    text-align: center;
    cursor: pointer;
    transform: translate(3px, 2px);
  }
`;
