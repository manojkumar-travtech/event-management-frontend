const SidebarFooter: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => (
  <div
    className={`p-6 border-t border-gray-200 transition-all duration-300 ${
      isCollapsed ? "px-3" : "px-6"
    }`}
  >
    {!isCollapsed && (
      <div className="text-xs text-gray-500 text-center">
        © 2024 Your Company
      </div>
    )}
  </div>
);
export default SidebarFooter