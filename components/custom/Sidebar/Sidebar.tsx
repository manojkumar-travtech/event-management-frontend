"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Star,
  Users,
  CreditCard,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Send,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { Typography } from "../Typography";
import { Header } from "../Header";
import SidebarHeader from "./SidebarHeader";
import { MENU_ITEMS, MenuItemComponentProps, SidebarProps } from "./MenuItems";
import SidebarFooter from "./SidebarFooter";
import MenuItemComponent from "./MenuItemComponent";

// Types


// Constants
const SIDEBAR_WIDTH_EXPANDED = "w-80";
const SIDEBAR_WIDTH_COLLAPSED = "w-16";
const SIDEBAR_WIDTH_MOBILE = "w-80";


// Custom hooks
const useActiveMenu = (pathname: string) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const activeItem = MENU_ITEMS.find((item) =>
      item.submenu?.some((submenuItem) => pathname.startsWith(submenuItem.path))
    );

    setOpenSubmenu(activeItem?.id || null);
  }, [pathname]);

  return { openSubmenu, setOpenSubmenu };
};


const SidebarNavigation: React.FC<{
  pathname: string;
  openSubmenu: string | null;
  isCollapsed: boolean;
  onToggleSubmenu: (itemId: string) => void;
  onNavigate: (path: string) => void;
}> = ({ pathname, openSubmenu, isCollapsed, onToggleSubmenu, onNavigate }) => (
  <nav
    className={`flex-1 py-4 transition-all duration-300 ${
      isCollapsed ? "px-2" : "px-6"
    }`}
  >
    <ul className="space-y-2">
      {MENU_ITEMS.map((item) => {
        const isOpen = openSubmenu === item.id && !isCollapsed;
        const isActive = item.path
          ? pathname === item.path
          : item.submenu?.some((sub) => pathname === sub.path) || false;

        return (
          <li key={item.id}>
            <MenuItemComponent
              item={item}
              isOpen={isOpen}
              isActive={isActive}
              pathname={pathname}
              isCollapsed={isCollapsed}
              onToggle={onToggleSubmenu}
              onNavigate={onNavigate}
            />
          </li>
        );
      })}
    </ul>
  </nav>
);

const MobileMenuButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="lg:hidden cursor-pointer fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
    aria-label="Open menu"
  >
    <Menu className="h-5 w-5 text-gray-600" />
  </button>
);

const MobileOverlay: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => (
  <>
    {isOpen && (
      <div
        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
    )}
  </>
);

// Main Sidebar Component
export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const { openSubmenu, setOpenSubmenu } = useActiveMenu(pathname);

  useEffect(() => {
    if (isCollapsed) setOpenSubmenu(null);
  }, [isCollapsed, setOpenSubmenu]);

  const handleToggleSubmenu = useCallback(
    (itemId: string) => {
      if (!isCollapsed)
        setOpenSubmenu((prev) => (prev === itemId ? null : itemId));
    },
    [isCollapsed, setOpenSubmenu]
  );

  const handleNavigate = useCallback(
    (path: string) => {
      setIsMobileMenuOpen(false);
      router.push(path);
    },
    [router]
  );

  const handleCloseMobileMenu = useCallback(
    () => setIsMobileMenuOpen(false),
    []
  );
  const handleOpenMobileMenu = useCallback(() => setIsMobileMenuOpen(true), []);
  const handleToggleCollapse = useCallback(
    () => setIsCollapsed((prev) => !prev),
    []
  );

  const sidebarWidth = isCollapsed
    ? SIDEBAR_WIDTH_COLLAPSED
    : SIDEBAR_WIDTH_EXPANDED;
  const mainMargin = isCollapsed ? "lg:ml-16" : "lg:ml-80";

  const desktopSidebarContent = (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      <SidebarHeader
        onClose={handleCloseMobileMenu}
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
      />
      <SidebarNavigation
        pathname={pathname}
        openSubmenu={openSubmenu}
        isCollapsed={isCollapsed}
        onToggleSubmenu={handleToggleSubmenu}
        onNavigate={handleNavigate}
      />
      <SidebarFooter isCollapsed={isCollapsed} />
    </div>
  );

  const mobileSidebarContent = (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      <SidebarHeader
        onClose={handleCloseMobileMenu}
        isCollapsed={false}
        onToggleCollapse={handleToggleCollapse}
      />
      <SidebarNavigation
        pathname={pathname}
        openSubmenu={openSubmenu}
        isCollapsed={false}
        onToggleSubmenu={handleToggleSubmenu}
        onNavigate={handleNavigate}
      />
      <SidebarFooter isCollapsed={false} />
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <MobileMenuButton onClick={handleOpenMobileMenu} />
      <MobileOverlay
        isOpen={isMobileMenuOpen}
        onClose={handleCloseMobileMenu}
      />

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:block ${sidebarWidth} h-full fixed left-0 top-0 z-30 transition-all duration-300`}
      >
        {desktopSidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={`lg:hidden fixed left-0 top-0 h-full ${SIDEBAR_WIDTH_MOBILE} max-w-[85vw] z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {mobileSidebarContent}
      </aside>

      {/* Main content with header */}
      <main
        className={`flex-1 ${mainMargin} transition-all duration-300 flex flex-col`}
      >
        <Header onMenuClick={handleOpenMobileMenu} />
        <div className="flex-1 p-4 box-border">{children}</div>
      </main>
    </div>
  );
};

export default Sidebar;
