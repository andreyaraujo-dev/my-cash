import {
  Briefcase,
  Car,
  CreditCard,
  Dumbbell,
  Gamepad2,
  Gift,
  GraduationCap,
  HeartPulse,
  Home,
  Laptop,
  PawPrint,
  Plane,
  Receipt,
  RefreshCw,
  Shirt,
  ShoppingCart,
  Star,
  UtensilsCrossed,
} from 'lucide-react';
import { ExpenseDefault } from './Expense/ExpenseDefault';
import { IncomeDefault } from './Income/IncomeDefault';

export const iconsMap = {
  INCOME: {
    default: IncomeDefault,
    salary: Briefcase,
    bonus: Star,
    freelance: Laptop,
  },
  EXPENSE: {
    default: ExpenseDefault,
    food: UtensilsCrossed,
    fun: Gamepad2,
    grocery: ShoppingCart,
    home: Home,
    education: GraduationCap,
    clothes: Shirt,
    transport: Car,
    travel: Plane,
    health: HeartPulse,
    pets: PawPrint,
    bills: Receipt,
    gifts: Gift,
    subscriptions: RefreshCw,
    gym: Dumbbell,
    creditCard: CreditCard,
  },
};
