import gql from "graphql-tag";
import * as React from "react";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactComponents from "@apollo/react-components";
import * as ApolloReactHoc from "@apollo/react-hoc";
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
  id: Scalars["String"];
  brand?: Maybe<Scalars["String"]>;
  label?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type Organisation = {
  __typename?: "Organisation";
  id: Scalars["String"];
  name: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  dummy?: Maybe<Scalars["String"]>;
  organisations: Array<Organisation>;
  services: Array<Service>;
  cardTypes: Array<CardType>;
};

export type Service = {
  __typename?: "Service";
  id: Scalars["String"];
  name: Scalars["String"];
};
export type OrganisationsQueryVariables = {};

export type OrganisationsQuery = { __typename?: "Query" } & {
  organisations: Array<
    { __typename?: "Organisation" } & Pick<Organisation, "id" | "name">
  >;
};

export type ServicesQueryVariables = {};

export type ServicesQuery = { __typename?: "Query" } & {
  services: Array<{ __typename?: "Service" } & Pick<Service, "id" | "name">>;
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

export const OrganisationsDocument = gql`
  query Organisations {
    organisations
      @rest(type: "Organisation", path: "/internal/services/organisations") {
      id
      name
    }
  }
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

export type OrganisationsProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  OrganisationsQuery,
  OrganisationsQueryVariables
> &
  TChildProps;
export function withOrganisations<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    OrganisationsQuery,
    OrganisationsQueryVariables,
    OrganisationsProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    OrganisationsQuery,
    OrganisationsQueryVariables,
    OrganisationsProps<TChildProps>
  >(OrganisationsDocument, {
    alias: "organisations",
    ...operationOptions
  });
}
export type OrganisationsQueryResult = ApolloReactCommon.QueryResult<
  OrganisationsQuery,
  OrganisationsQueryVariables
>;
export const ServicesDocument = gql`
  query Services {
    services @rest(type: "Service", path: "/internal/services/services") {
      id
      name
    }
  }
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

export type ServicesProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  ServicesQuery,
  ServicesQueryVariables
> &
  TChildProps;
export function withServices<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    ServicesQuery,
    ServicesQueryVariables,
    ServicesProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    ServicesQuery,
    ServicesQueryVariables,
    ServicesProps<TChildProps>
  >(ServicesDocument, {
    alias: "services",
    ...operationOptions
  });
}
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

export type CardTypesProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  CardTypesQuery,
  CardTypesQueryVariables
> &
  TChildProps;
export function withCardTypes<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CardTypesQuery,
    CardTypesQueryVariables,
    CardTypesProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    CardTypesQuery,
    CardTypesQueryVariables,
    CardTypesProps<TChildProps>
  >(CardTypesDocument, {
    alias: "cardTypes",
    ...operationOptions
  });
}
export type CardTypesQueryResult = ApolloReactCommon.QueryResult<
  CardTypesQuery,
  CardTypesQueryVariables
>;
