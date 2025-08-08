// frontendEagledac/src/components/Sidebar.tsx
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/useTheme";
import {
  FiActivity,
  FiFileText,
  FiCode,
  FiUploadCloud,
  FiHelpCircle,
} from "react-icons/fi";

type SidebarProps = {
  open: boolean;
};

function Sidebar({ open }: SidebarProps) {
  const { theme } = useTheme();

  const sidebarLinks = [
    {
      path: "/audit",
      label: "Audit",
      icon: <FiActivity />,
    },
    {
      path: "/creator",
      label: "DAC Creator",
      icon: <FiCode />,
    },
    {
      path: "/deploy",
      label: "Deploy",
      icon: <FiUploadCloud />,
    },
    {
      path: "/docs",
      label: "Documentation",
      icon: <FiFileText />,
    },
  ];

  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="sidebar-logo">
        <FiCode size={24} />
        <span>EagleDAC</span>
      </div>

      <nav>
        <ul>
          {sidebarLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {link.icon}
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="divider" />

        <ul>
          <li>
            <NavLink
              to="/help"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FiHelpCircle />
              Help & Support
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="theme-info">
        <p>Current theme: {theme === "dark" ? "Dark" : "Light"}</p>
        <p>v1.0.0</p>
      </div>
    </aside>
  );
}

export default Sidebar;
