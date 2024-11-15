import styled, { css } from "styled-components";

const variations = {
  high: css`
    background-color: #f8202d;
  `,
  medium: css`
    background-color: #3f8efc;
  `,
  low: css`
    background-color: #f8a520;
  `,
};

const Priority = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  border-radius: 10px;
  padding: 0px 8px;
  align-self: center;

  ${(props) => variations[props.variation]}
`;

export default Priority;
