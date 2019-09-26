import styled from "../styled-components";

const Hr = styled.hr`
  ${props => {
    const { white, midGrey } = props.theme.colors;
    return `
      border-width: 1px;
      border-style: solid;
      border-top-color: ${midGrey};
      border-bottom-color: ${white};
      border-left: none;
      border-right: none;
      margin: 2rem 0;
    `;
  }}
`;

export default Hr;
