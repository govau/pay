export interface User {
  externalId: string;
  insertedAt: string;
  updatedAt: string;
  platformAdmin: boolean;
  name: string;
  email: string;
  telephoneNumber: string;
}

export const emptyUser: User = {
  externalId: "",
  insertedAt: "",
  updatedAt: "",
  platformAdmin: false,
  name: "",
  email: "",
  telephoneNumber: ""
};
