import * as React from "react";

import { PaymentFragment } from "./__generated__/graphql";

const PaymentContext = React.createContext<null | PaymentFragment>(null);

export default PaymentContext;
