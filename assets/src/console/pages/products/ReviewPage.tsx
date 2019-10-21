import * as React from "react";
import {
  PageTitle,
  DescriptionList,
  Button,
  Link,
  ScreenReaderText,
  Text
} from "@pay/web";
import { FormElement, OnSubmitFn } from "@pay/web/components/form/Form";

import { Values } from "./CreateFormPage";

interface Props {
  path: string;
  values: Values;
  onSubmit: OnSubmitFn;
}

const ReviewPage: React.FC<Props> = ({ path, values, onSubmit }) => (
  <FormElement
    column
    onSubmit={async event => {
      await onSubmit(event);
    }}
    noValidate
  >
    <PageTitle title="Review your payment link details" />
    <DescriptionList>
      <div>
        <dt>Title</dt>
        <dd>{values.name}</dd>
        <dd>
          <Link to={`${path}/details`}>
            Change <ScreenReaderText>title</ScreenReaderText>
          </Link>
        </dd>
      </div>
      <div>
        <dt>More details</dt>
        <dd>{values.description || <Text variant="gray">None given</Text>}</dd>
        <dd>
          <Link to={`${path}/details`}>
            Change <ScreenReaderText>more details</ScreenReaderText>
          </Link>
        </dd>
      </div>
      <div>
        <dt>Reference number</dt>
        {values.reference_enabled ? (
          <>
            <dd>{values.reference_label}</dd>
            <dd>
              <Text variant="gray">{values.reference_hint}</Text>
            </dd>
          </>
        ) : (
          <dd>
            <Text variant="gray">Created by Pay.gov.au</Text>
          </dd>
        )}
        <dd>
          <Link to={`${path}/reference`}>
            Change <ScreenReaderText>payment reference</ScreenReaderText>
          </Link>
        </dd>
      </div>
      <div>
        <dt>Payment amount</dt>
        <dd>
          {values.price_fixed ? (
            <>${Number(values.price).toFixed(2)}</>
          ) : (
            <Text variant="gray">User can choose</Text>
          )}
        </dd>
        <dd>
          <Link to={`${path}/amount`}>
            Change <ScreenReaderText>payment amount</ScreenReaderText>
          </Link>
        </dd>
      </div>
    </DescriptionList>
    <Button type="submit">Create payment link</Button>
  </FormElement>
);

export default ReviewPage;
