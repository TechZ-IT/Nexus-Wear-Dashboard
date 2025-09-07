export type Role = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type Admin = {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationalId: string;
  addressLine: string;
  image: string | null;
  roleId: string;
  role: Role;
  status: "pending" | "active" | "inactive" |"deleted" 
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};