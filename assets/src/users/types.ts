export interface User {
  id: string;
  insertedAt: string;
  updatedAt: string;
  platformAdmin: boolean;
  name: string;
  email: string;
  telephoneNumber: string;
}

export const emptyUser: User = {
  id: "",
  insertedAt: "",
  updatedAt: "",
  platformAdmin: false,
  name: "",
  email: "",
  telephoneNumber: ""
};
