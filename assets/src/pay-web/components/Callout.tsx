import styled from "../styled-components";

const Callout = styled.div`
  background: ${props => props.theme.colors.lightGray};
  border-left: 4px solid ${props => props.theme.colors.payBlue};
  padding: 2rem 0 0.2rem 2.5rem;
  margin: 2rem 0 2rem 0;
`;

export default Callout;
