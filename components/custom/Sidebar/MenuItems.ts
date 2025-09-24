import { BarChart3, CreditCard, Send, Star, Users } from "lucide-react";

export interface SubmenuItem {
  id: string;
  title: string;
  path: string;
}

export interface MenuItem {
  id: string;
  title: string;
  icon?: React.ComponentType<any>;
  path?: string;
  hasSubmenu?: boolean;
  submenu?: SubmenuItem[];
}

export interface SidebarProps {
  children: React.ReactNode;
}


export interface MenuItemComponentProps {
  item: MenuItem;
  isOpen: boolean;
  isActive: boolean;
  pathname: string;
  isCollapsed: boolean;
  onToggle: (itemId: string) => void;
  onNavigate: (path: string) => void;
}

export const MENU_ITEMS: MenuItem[] = [
  { id: "events", title: "Events", icon: Star, path: "/events" },
  {
    id: "user-management",
    title: "User Management",
    icon: Users,
    hasSubmenu: true,
    submenu: [
      { id: "create-user", title: "Create User", path: "/users/create" },
      { id: "manage-users", title: "Manage Users", path: "/users/manage" },
      { id: "user-roles", title: "User Roles", path: "/users/roles" },
    ],
  },
  {
    id: "credit-card",
    title: "Credit Card",
    icon: CreditCard,
    hasSubmenu: true,
    submenu: [
      {
        id: "transactions",
        title: "Transactions",
        path: "/credit-card/transactions",
      },
      {
        id: "payment-methods",
        title: "Payment Methods",
        path: "/credit-card/methods",
      },
      {
        id: "billing-history",
        title: "Billing History",
        path: "/credit-card/billing",
      },
    ],
  },
  {
    id: "reports",
    title: "Reports",
    icon: BarChart3,
    hasSubmenu: true,
    submenu: [
      {
        id: "air-manifest",
        title: "Air Manifest",
        path: "/reports/air-manifest",
      },
      { id: "invitation", title: "Invitation", path: "/reports/invitation" },
      {
        id: "registration",
        title: "Registration",
        path: "/reports/registration",
      },
    ],
  },
  {
    id: "requests",
    title: "Requests",
    icon: Send,
    hasSubmenu: true,
    submenu: [
      {
        id: "pending-requests",
        title: "Pending Requests",
        path: "/requests/pending",
      },
      {
        id: "approved-requests",
        title: "Approved Requests",
        path: "/requests/approved",
      },
      {
        id: "rejected-requests",
        title: "Rejected Requests",
        path: "/requests/rejected",
      },
    ],
  },
];