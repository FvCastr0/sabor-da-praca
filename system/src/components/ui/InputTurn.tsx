import styled from "styled-components";
import { colors } from "./theme";

export const InputTurn = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;

  input[type="radio"] {
    appearance: none;
    width: 16px;
    height: 16px;
    border: 1px solid ${colors.primary};
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    position: relative;
    background-color: white;
    padding: 0;
    transform: translateY(2px);
    &:checked {
      border-color: ${colors.primary};
    }

    &:checked::before {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: ${colors.primary};
    }
  }

  label {
    cursor: pointer;
  }
`;
