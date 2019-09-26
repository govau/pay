export interface User {
  id: string;
  insertedAt: string;
  updatedAt: string;
  name: string;
  email: string;
  mobilePhone: string;
}

export const emptyUser: User = {
  id: "",
  insertedAt: "",
  updatedAt: "",
  name: "",
  email: "",
  mobilePhone: ""
};
