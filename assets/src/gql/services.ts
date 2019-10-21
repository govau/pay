export const typePatchers = {
  ServiceUser: (data: any): any => {
    if (data.user) {
      data.user = { __typename: "User", ...data.user };
    }
    if (data.role) {
      data.role = { __typename: "Role", ...data.role };
    }
    return data;
  }
};
