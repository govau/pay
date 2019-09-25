import styled from "../../styled-components";

interface Props {
  fill?: string;
}

const RoundedIcon = styled.div<Props>`
  width: 35px;
  height: 35px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${props => props.fill || props.theme.colors.chateauGreen};
`;

export default RoundedIcon;
