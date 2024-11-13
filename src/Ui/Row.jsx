import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  margin-bottom: 1.4rem;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
      gap: ${props.gap};
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1rem;
      gap: ${props.gap};
    `}
`;

Row.defaultProps = {
  type: "vertical",
  gap: "5px",
};

export default Row;
