import styled from "styled-components";
import { colors } from "./theme";

export const FormCard = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fafafa;
  box-shadow: 4px 1px 12px 2px ${colors.terciary};
  padding: 3rem 3rem 4rem 3rem;
  border-radius: 0.5rem;
  background-color: ${colors.primary};

  h1 {
    margin: 0 2rem;
    margin-bottom: 1.8rem;
    font-size: 1.3rem;
    color: ${colors.white};
  }

  #logo {
    border-right: 1px solid ${colors.secondary};
  }

  @media (max-width: 880px) {
    margin-top: 20dvh;
    div {
      flex-wrap: wrap;
    }

    #logo {
      border-right: none;
      margin-bottom: 2rem;
    }
  }

  @media (max-width: 500px) {
    padding: 3rem 1rem 4rem 1rem;
    text-align: center;

    #logo {
      width: auto;
      height: auto;
      max-width: 55%;
    }
  }
`;

export const Input = styled.article`
  position: relative;
  margin-bottom: 0.2rem;
  line-height: 1.5rem;

  input {
    background: transparent;
    border: none;
    border-bottom: 1px solid ${colors.white};
    outline: none;
    color: white;
    font-size: 1.2rem;
    width: 23rem;
    padding: 7px;
    margin-bottom: 1.2rem;
    color: ${colors.white};
  }

  label {
    position: absolute;
    margin-top: 13px;
    top: 0;
    left: 0;
    transition: all 0.3s ease-out;
    color: ${colors.white};
    margin-bottom: 1rem;
  }

  input:focus + label,
  input:valid + label {
    font-size: 13px;
    margin-top: -15px;
  }
  @media (max-width: 460px) {
    input {
      max-width: 18rem;
    }
  }
`;

export const FormButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 1px solid ${colors.white};
  padding: 0.4rem 1rem;
  border-radius: 0.2rem;
  transition: all 0.3s ease-in-out;
  color: ${colors.white};

  &:hover {
    background-color: ${colors.secondary};
    border-color: ${colors.secondary};
    color: ${colors.white};
  }
`;
