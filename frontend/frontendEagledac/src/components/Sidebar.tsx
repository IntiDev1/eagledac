import { NavLink } from "react-router-dom";
import "../styles/sidebar.scss";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar__nav">
        <NavLink
          to="/audit"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          🛡️ EagleAudit
        </NavLink>
        <NavLink
          to="/creator"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          🛠️ DAC Creator
        </NavLink>
        <NavLink
          to="/deploy"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          📦 DAC Panel
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
