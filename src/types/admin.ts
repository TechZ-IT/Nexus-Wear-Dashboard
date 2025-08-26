interface Role {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  id: number;
  name: string;
  email: string;
  phone: string;
  image: string | null;
  role: Role;
  roleId: number;
  createdAt: string;
  updatedAt: string;
}