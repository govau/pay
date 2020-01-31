import styled, { css } from "../styled-components";

export const ResponsiveWrapper = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
`;

export const Row = styled.tr`
  &:nth-child(even) {
    background-color: ${props => props.theme.colors.payLightGrey};
  }
`;

export const LinkRow = styled(Row)`
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.payLightGrey};
  }
`;

const cellStyle = css`
  padding: 1rem;
`;

export const Header = styled.th`
  ${cellStyle};
  font-size: 1.3rem;
  color: ${props => props.theme.colors.payLightBlack};
  font-weight: normal;
`;

export const Cell = styled.td`
  ${cellStyle};
`;

export const NumericHeader = styled(Header)`
  text-align: right;
`;

export const NumericCell = styled(Cell)`
  text-align: right;
  font-feature-settings: normal;
  font-variant-numeric: tabular-nums;
`;
