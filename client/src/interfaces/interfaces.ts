export interface I_Type {
  id: number;
  name: string;
}

export interface I_Device {
  id: number;
  slug: string;
  name: string;
  price: number;
  sale: number;
  image: string;
  description: string;
}

export interface I_User {
  email: string;
  id: number;
  image: string;
  name: string;
  password: string;
  phone: string;
  role: string;
}
