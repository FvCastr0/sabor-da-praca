import styled from "styled-components";
import { colors } from "./theme";

interface prop {
  type?: string;
}

export const CardSales = styled.article<prop>`
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: ${props => (props.type === "bigger" ? "100%" : "600px")};
  line-height: 1.3;

  @media (max-width: 880px) {
    max-width: 100%;
  }

  article {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  h2 {
    font-size: 1.5rem;
    color: ${colors.secondary};
    margin-bottom: 0.2rem;
  }

  p {
    font-size: 1.08rem;
    color: black;
  }

  span {
    color: ${colors.terciary};
  }

  a {
    color: ${colors.primary};
    text-decoration: none;
    margin-bottom: 1rem;
    font-weight: bold;
  }
`;
