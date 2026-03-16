export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  benefits?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
