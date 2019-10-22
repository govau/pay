export const typePatchers = {
  ProductPayment: (data: any): any => {
    if (data.product) {
      data.product = {
        __typename: "Product",
        ...data.product
      };

      if (data.product.gateway_account) {
        data.product.gateway_account = {
          __typename: "GatewayAccount",
          ...data.product.gateway_account
        };

        if (data.product.gateway_account.service) {
          data.product.gateway_account.service = {
            __typename: "Service",
            ...data.product.gateway_account.service
          };
        }
      }
    }
    return data;
  }
};
