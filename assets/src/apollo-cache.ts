import { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-boost";

import introspectionQueryResultData from "./__generated__/introspection-result";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

export const cache = new InMemoryCache({
  fragmentMatcher
});
