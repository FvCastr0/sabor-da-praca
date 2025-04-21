import styled from "styled-components";

export const Sales = styled.section`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  align-items: left;
  background-color: #f6f6f6;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.589);
  border-radius: 8px;
  margin: 0 1rem;

  .sales-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1rem;
    gap: 1rem;

    h1 {
      font-size: 1.4rem;
    }
  }

  section {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;
