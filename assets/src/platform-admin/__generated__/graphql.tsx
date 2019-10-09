import gql from "graphql-tag";
import * as React from "react";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactComponents from "@apollo/react-components";
import * as ApolloReactHooks from "@apollo/react-hooks";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CardType = {
  __typename?: "CardType";
  id: Scalars["ID"];
  brand: Scalars["String"];
  label: Scalars["String"];
  type: Scalars["String"];
};

export type Organisation = {
  __typename?: "Organisation";
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  dummy?: Maybe<Scalars["String"]>;
  organisations: Array<Organisation>;
  services: Array<Service>;
  cardTypes: Array<CardType>;
};

export type Role = {
  __typename?: "Role";
  id: Scalars["ID"];
  name: Scalars["String"];
  description: Scalars["String"];
};

export type Service = {
  __typename?: "Service";
  id: Scalars["ID"];
  name: Scalars["String"];
  current_go_live_stage: ServiceGoLiveStage;
  users?: Maybe<Array<ServiceUser>>;
};

export enum ServiceGoLiveStage {
  NotStarted = "not_started",
  Live = "live"
}

export type ServiceUser = {
  __typename?: "ServiceUser";
  service: Service;
  user: User;
  role: Role;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  inserted_at: Scalars["String"];
  updated_at: Scalars["String"];
  platform_admin: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  email: Scalars["String"];
  telephone_number?: Maybe<Scalars["String"]>;
};

export type OrganisationFragment = { __typename?: "Organisation" } & Pick<
  Organisation,
  "id" | "name"
>;

export type ServiceFragment = { __typename?: "Service" } & Pick<
  Service,
  "id" | "name"
>;

export type OrganisationsQueryVariables = {};

export type OrganisationsQuery = { __typename?: "Query" } & {
  organisations: Array<{ __typename?: "Organisation" } & OrganisationFragment>;
};

export type ServicesQueryVariables = {};

export type ServicesQuery = { __typename?: "Query" } & {
  services: Array<{ __typename?: "Service" } & ServiceFragment>;
};

export type CardTypesQueryVariables = {};

export type CardTypesQuery = { __typename?: "Query" } & {
  cardTypes: Array<
    { __typename?: "CardType" } & Pick<
      CardType,
      "id" | "brand" | "label" | "type"
    >
  >;
};

export const OrganisationFragmentDoc = gql`
  fragment Organisation on Organisation {
    id
    name
  }
`;
export const ServiceFragmentDoc = gql`
  fragment Service on Service {
    id
    name
  }
`;
export const OrganisationsDocument = gql`
  query Organisations {
    organisations
      @rest(type: "Organisation", path: "/internal/services/organisations") {
      ...Organisation
    }
  }
  ${OrganisationFragmentDoc}
`;
export type OrganisationsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    OrganisationsQuery,
    OrganisationsQueryVariables
  >,
  "query"
>;

export const OrganisationsComponent = (props: OrganisationsComponentProps) => (
  <ApolloReactComponents.Query<OrganisationsQuery, OrganisationsQueryVariables>
    query={OrganisationsDocument}
    {...props}
  />
);

/**
 * __useOrganisationsQuery__
 *
 * To run a query within a React component, call `useOrganisationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganisationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganisationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useOrganisationsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    OrganisationsQuery,
    OrganisationsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    OrganisationsQuery,
    OrganisationsQueryVariables
  >(OrganisationsDocument, baseOptions);
}
export function useOrganisationsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    OrganisationsQuery,
    OrganisationsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    OrganisationsQuery,
    OrganisationsQueryVariables
  >(OrganisationsDocument, baseOptions);
}
export type OrganisationsQueryHookResult = ReturnType<
  typeof useOrganisationsQuery
>;
export type OrganisationsLazyQueryHookResult = ReturnType<
  typeof useOrganisationsLazyQuery
>;
export type OrganisationsQueryResult = ApolloReactCommon.QueryResult<
  OrganisationsQuery,
  OrganisationsQueryVariables
>;
export const ServicesDocument = gql`
  query Services {
    services @rest(type: "Service", path: "/internal/services/services") {
      ...Service
    }
  }
  ${ServiceFragmentDoc}
`;
export type ServicesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    ServicesQuery,
    ServicesQueryVariables
  >,
  "query"
>;

export const ServicesComponent = (props: ServicesComponentProps) => (
  <ApolloReactComponents.Query<ServicesQuery, ServicesQueryVariables>
    query={ServicesDocument}
    {...props}
  />
);

/**
 * __useServicesQuery__
 *
 * To run a query within a React component, call `useServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServicesQuery({
 *   variables: {
 *   },
 * });
 */
export function useServicesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ServicesQuery,
    ServicesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<ServicesQuery, ServicesQueryVariables>(
    ServicesDocument,
    baseOptions
  );
}
export function useServicesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ServicesQuery,
    ServicesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<ServicesQuery, ServicesQueryVariables>(
    ServicesDocument,
    baseOptions
  );
}
export type ServicesQueryHookResult = ReturnType<typeof useServicesQuery>;
export type ServicesLazyQueryHookResult = ReturnType<
  typeof useServicesLazyQuery
>;
export type ServicesQueryResult = ApolloReactCommon.QueryResult<
  ServicesQuery,
  ServicesQueryVariables
>;
export const CardTypesDocument = gql`
  query CardTypes {
    cardTypes @rest(type: "CardType", path: "/internal/payments/card-types") {
      id
      brand
      label
      type
    }
  }
`;
export type CardTypesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    CardTypesQuery,
    CardTypesQueryVariables
  >,
  "query"
>;

export const CardTypesComponent = (props: CardTypesComponentProps) => (
  <ApolloReactComponents.Query<CardTypesQuery, CardTypesQueryVariables>
    query={CardTypesDocument}
    {...props}
  />
);

/**
 * __useCardTypesQuery__
 *
 * To run a query within a React component, call `useCardTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCardTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCardTypesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    CardTypesQuery,
    CardTypesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<CardTypesQuery, CardTypesQueryVariables>(
    CardTypesDocument,
    baseOptions
  );
}
export function useCardTypesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    CardTypesQuery,
    CardTypesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<CardTypesQuery, CardTypesQueryVariables>(
    CardTypesDocument,
    baseOptions
  );
}
export type CardTypesQueryHookResult = ReturnType<typeof useCardTypesQuery>;
export type CardTypesLazyQueryHookResult = ReturnType<
  typeof useCardTypesLazyQuery
>;
export type CardTypesQueryResult = ApolloReactCommon.QueryResult<
  CardTypesQuery,
  CardTypesQueryVariables
>;
