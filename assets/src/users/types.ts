export interface User {
  updatedAt: string;
  name: string;
  email: string;
  mobilePhone: string;
}

export const emptyUser: User = {
  updatedAt: "",
  name: "",
  email: "",
  mobilePhone: ""
};
