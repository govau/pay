import styled, { css } from "../styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
`;

export const Row = styled.tr``;

export const LinkRow = styled(Row)`
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const numericStyle = css`
  text-align: right;
  font-feature-settings: normal;
  font-variant-numeric: tabular-nums;
`;

const cellStyle = css`
  text-align: left;
  vertical-align: top;
  padding: 1rem 2rem 1rem 0;
  border-bottom: 1px solid silver;

  &:last-child {
    padding-right: 0;
  }
`;

export const Header = styled.th`
  ${cellStyle};
`;

export const Cell = styled.td`
  ${cellStyle};
`;

export const NumericHeader = styled(Header)`
  ${numericStyle};
`;

export const NumericCell = styled(Cell)`
  ${numericStyle};
`;
