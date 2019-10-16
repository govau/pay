import * as React from "react";

import { ProductFragment } from "./__generated__/graphql";

const ProductContext = React.createContext<null | ProductFragment>(null);

export default ProductContext;
