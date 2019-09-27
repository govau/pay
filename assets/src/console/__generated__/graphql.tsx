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

export type Query = {
  __typename?: "Query";
  dummy?: Maybe<Scalars["String"]>;
  services: Array<Service>;
};

export type Service = {
  __typename?: "Service";
  id: Scalars["String"];
  name: Scalars["String"];
};
export type UserServicesQueryVariables = {};

export type UserServicesQuery = { __typename?: "Query" } & {
  services: Array<{ __typename?: "Service" } & Pick<Service, "id" | "name">>;
};

export const UserServicesDocument = gql`
  query UserServices {
    services
      @rest(
        type: "Service"
        path: "/internal/services/users/{context.userId}/services"
      ) {
      id
      name
    }
  }
`;
export type UserServicesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    UserServicesQuery,
    UserServicesQueryVariables
  >,
  "query"
>;

export const UserServicesComponent = (props: UserServicesComponentProps) => (
  <ApolloReactComponents.Query<UserServicesQuery, UserServicesQueryVariables>
    query={UserServicesDocument}
    {...props}
  />
);

export type UserServicesProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  UserServicesQuery,
  UserServicesQueryVariables
> &
  TChildProps;
export function withUserServices<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UserServicesQuery,
    UserServicesQueryVariables,
    UserServicesProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    UserServicesQuery,
    UserServicesQueryVariables,
    UserServicesProps<TChildProps>
  >(UserServicesDocument, {
    alias: "userServices",
    ...operationOptions
  });
}
export type UserServicesQueryResult = ApolloReactCommon.QueryResult<
  UserServicesQuery,
  UserServicesQueryVariables
>;
