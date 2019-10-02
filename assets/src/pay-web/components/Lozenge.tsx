import styled from "../styled-components";

const Lozenge = styled.span`
  font-size: 1.4rem;
  background-color: ${props => props.theme.colors.flair};
  padding: 2px 8px;
  border-radius: 2px;

  * + & {
    margin-left: 1em;
  }
`;

const SecondaryLozenge = styled(Lozenge)`
  background-color: transparent;
  border: 1px solid ${props => props.theme.colors.white};
`;

export default Lozenge;
export { SecondaryLozenge };
