import * as React from "react";
import * as renderer from "react-test-renderer";
import Field from "./Field";
import { wrapWithFinalForm } from "../../lib/test-utils";

test("Field renders correctly", () => {
  const tree = renderer
    .create(
      // wrapped in Form to suppress console errors from react-final-form
      wrapWithFinalForm(
        <Field name="some-field" label="Some Field">
          {() => <input type="text" />}
        </Field>
      )
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
