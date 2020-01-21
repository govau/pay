
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
  "__schema": {
    "types": [
      {
        "kind": "UNION",
        "name": "GatewayAccountCredentials",
        "possibleTypes": [
          {
            "name": "BamboraCredentials"
          },
          {
            "name": "SandboxCredentials"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "TransactionEvent",
        "possibleTypes": [
          {
            "name": "PaymentRefundEvent"
          },
          {
            "name": "PaymentEvent"
          }
        ]
      }
    ]
  }
};
      export default result;
    