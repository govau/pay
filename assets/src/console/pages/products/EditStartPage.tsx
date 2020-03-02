import * as React from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  PageTitle,
  DescriptionList,
  Button,
  Link,
  ScreenReaderText,
  Text
} from "@pay/web";
import { FormElement, OnSubmitFn } from "@pay/web/components/form/Form";
import { ProductFragment } from "../../../products/__generated__/graphql";

interface Props {
  path: string;
  productPath: string;
  values: Values;
  product: ProductFragment;
  onSubmit: OnSubmitFn;
}

export interface Values {
  name: string;
  description?: string;
  reference_enabled: boolean | null;
  reference_label: string;
  reference_hint: string;
  price_fixed: boolean | null;
  price: number;
}

const EditStartPage: React.FC<Props> = ({
  path,
  productPath,
  values,
  product,
  onSubmit
}) => {
  const location = useLocation();
  const history = useHistory();

  return (
    <>
      <FormElement
        column
        onSubmit={async event => {
          await onSubmit(event);
          history.push(productPath);
        }}
        noValidate
      >
        <PageTitle title="Edit your payment link" />
        <DescriptionList>
          <div>
            <dt>Title</dt>
            <dd>{values.name}</dd>
            <dd>
              <Link to={`${location.pathname}/details`}>
                Change <ScreenReaderText>title</ScreenReaderText>
              </Link>
            </dd>
          </div>
          <div>
            <dt>More details</dt>
            <dd>
              {values.description || <Text variant="gray">None given</Text>}
            </dd>
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
        <Button type="submit">Save changes</Button>
      </FormElement>
    </>
  );
};

export default EditStartPage;
