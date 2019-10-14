import styled from "../styled-components";

const DescriptionList = styled("dl")<{ inline?: boolean }>`
  margin: 0;
  dt {
    font-weight: bold;
  }
  dd {
    margin: 0 0 1rem;
  }
  ${props =>
    props.inline &&
    `
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 4rem;
    dd {
      margin: 0;
    }
  `}
`;

export default DescriptionList;
