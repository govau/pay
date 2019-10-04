import { partitionByRole } from "./team";

const emptyPartitions = {
  admin: { users: [] },
  view_and_refund: { users: [] },
  view_only: { users: [] }
};

const adminRole = { name: "admin" };
const viewOnlyRole = { name: "view_only" };
const user1234 = { id: "1234" };
const user5678 = { id: "5678" };

test.each`
  input                                                                            | output
  ${[]}                                                                            | ${emptyPartitions}
  ${[{ user: null, role: null }]}                                                  | ${emptyPartitions}
  ${[{ user: {}, role: null }]}                                                    | ${emptyPartitions}
  ${[{ user: null, role: {} }]}                                                    | ${emptyPartitions}
  ${[{ user: user1234, role: adminRole }]}                                         | ${{ admin: { users: [user1234] }, view_and_refund: { users: [] }, view_only: { users: [] } }}
  ${[{ user: user1234, role: viewOnlyRole }]}                                      | ${{ admin: { users: [] }, view_and_refund: { users: [] }, view_only: { users: [user1234] } }}
  ${[{ user: user1234, role: adminRole }, { user: user5678, role: viewOnlyRole }]} | ${{ admin: { users: [user1234] }, view_and_refund: { users: [] }, view_only: { users: [user5678] } }}
`(
  "partitionByRole should return $output when provided $input",
  ({ input, output }) => {
    expect(partitionByRole(input)).toEqual(output);
  }
);
