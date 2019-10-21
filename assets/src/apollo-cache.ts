import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";

import introspectionQueryResultData from "./__generated__/graphql-introspection-result";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

export const cache = new InMemoryCache({
  fragmentMatcher
});
