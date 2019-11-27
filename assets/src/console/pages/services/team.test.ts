import { partitionByRole } from "./team";

const emptyPartitions = {
  admin: [],
  view_and_refund: [],
  view_only: []
};

const adminRole = { name: "admin" };
const viewOnlyRole = { name: "view_only" };
const user1234 = { id: "1234" };
const user5678 = { id: "5678" };

test.each`
  input                                       | output
  ${[]}                                       | ${emptyPartitions}
  ${[{ user: user1234, role: adminRole }]}    | ${{ admin: [{ user: user1234, role: adminRole }], view_and_refund: [], view_only: [] }}
  ${[{ user: user1234, role: viewOnlyRole }]} | ${{ admin: [], view_and_refund: [], view_only: [{ user: user1234, role: viewOnlyRole }] }}
  ${[
  { user: user1234, role: adminRole },
  { user: user5678, role: viewOnlyRole }
]} | ${{ admin: [{ user: user1234, role: adminRole }], view_and_refund: [], view_only: [{ user: user5678, role: viewOnlyRole }] }}
`(
  "partitionByRole should return $output when provided $input",
  ({ input, output }) => {
    expect(partitionByRole(input)).toEqual(output);
  }
);
