export type Role = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type Admin = {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string | null;
  role: Role;
  roleId: number;
  createdAt: string;
  updatedAt: string;
  status:string
}


