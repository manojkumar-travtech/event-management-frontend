import { ChevronDown, ChevronRight } from "lucide-react";
import { MenuItemComponentProps } from "./MenuItems";
import { Typography } from "../Typography";

// Tooltip component for collapsed state
const Tooltip: React.FC<{
  content: React.ReactNode;
  children: React.ReactNode;
}> = ({ content, children }) => (
  <div className="group relative">
    {children}
    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 top-1/2 transform -translate-y-1/2">
      {content}
      <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
    </div>
  </div>
);

const MenuItemComponent: React.FC<MenuItemComponentProps> = ({
  item,
  isOpen,
  isActive,
  pathname,
  isCollapsed,
  onToggle,
  onNavigate,
}) => {
  const Icon = item.icon;

  const getMenuItemClasses = (active: boolean) => `
    w-full flex items-center rounded-lg transition-all duration-300 cursor-pointer
    hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-opacity-50
    ${isCollapsed ? "px-3 py-3 justify-center" : "px-4 py-3"}
    ${
      active
        ? "bg-blue-50 text-blue-700" +
          (isCollapsed ? "" : " border-r-4 border-blue-400")
        : "text-gray-700 hover:text-gray-900"
    }
  `;

  const getSubmenuItemClasses = (active: boolean) => `
    w-full text-left px-4 py-2.5 rounded-md text-sm transition-all duration-200 cursor-pointer 
    hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-opacity-50
    ${
      active
        ? "bg-blue-50 text-blue-700 font-medium border-r-4 border-blue-400"
        : "text-gray-600 hover:text-gray-900"
    }
  `;

  if (item.hasSubmenu) {
    if (isCollapsed) {
      return (
        <Tooltip
          content={
            <div className="py-1">
              <div className="font-medium text-white mb-2">{item.title}</div>
              {item.submenu?.map((submenuItem) => (
                <div
                  key={submenuItem.id}
                  onClick={() => onNavigate(submenuItem.path)}
                  className="px-2 py-1 hover:bg-gray-700 rounded cursor-pointer text-sm"
                >
                  {submenuItem.title}
                </div>
              ))}
            </div>
          }
        >
          <button
            className={getMenuItemClasses(isActive)}
            aria-label={item.title}
          >
            {Icon && (
              <Icon
                className={`h-5 w-5 ${
                  isActive ? "text-blue-700" : "text-gray-500"
                }`}
              />
            )}
          </button>
        </Tooltip>
      );
    }

    return (
      <>
        <button
          onClick={() => onToggle(item.id)}
          className={getMenuItemClasses(isActive)}
          aria-expanded={isOpen}
        >
          <div className="flex items-center space-x-3 flex-1">
            {Icon && (
              <Icon
                className={`h-5 w-5 ${
                  isActive ? "text-blue-700" : "text-gray-500"
                }`}
              />
            )}
            <span className="font-medium">{item.title}</span>
          </div>
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-400" />
          )}
        </button>

        {isOpen && item.submenu && (
          <ul className="mt-2 space-y-1 ml-8 animate-in slide-in-from-top-2 duration-200">
            {item.submenu.map((submenuItem) => (
              <li key={submenuItem.id}>
                <button
                  onClick={() => onNavigate(submenuItem.path)}
                  className={getSubmenuItemClasses(
                    pathname === submenuItem.path
                  )}
                >
                  <Typography size="md" variant="text">
                    {submenuItem.title}
                  </Typography>
                </button>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }

  if (isCollapsed) {
    return (
      <Tooltip content={item.title}>
        <button
          onClick={() => item.path && onNavigate(item.path)}
          className={getMenuItemClasses(isActive)}
          aria-label={item.title}
        >
          {Icon && (
            <Icon
              className={`h-5 w-5 ${
                isActive ? "text-blue-700" : "text-gray-500"
              }`}
            />
          )}
        </button>
      </Tooltip>
    );
  }

  return (
    <button
      onClick={() => item.path && onNavigate(item.path)}
      className={getMenuItemClasses(isActive)}
    >
      <div className="flex items-center space-x-3">
        {Icon && (
          <Icon
            className={`h-5 w-5 ${
              isActive ? "text-blue-700" : "text-gray-500"
            }`}
          />
        )}
        <span>
          <Typography size="lg" variant="text">
            {item.title}
          </Typography>
        </span>
      </div>
    </button>
  );
};

export default MenuItemComponent;
