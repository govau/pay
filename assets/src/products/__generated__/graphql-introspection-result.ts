export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}
const result: IntrospectionResultData = {
  __schema: {
    types: [
      {
        kind: "UNION",
        name: "GatewayAccountCredentials",
        possibleTypes: [
          {
            name: "SandboxCredentials"
          },
          {
            name: "BamboraCredentials"
          }
        ]
      }
    ]
  }
};
export default result;
