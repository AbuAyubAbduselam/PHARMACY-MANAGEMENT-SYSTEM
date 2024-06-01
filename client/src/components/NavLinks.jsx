import { useDashboardContext } from "../pages/DashboardLayout";
import { NavLink } from "react-router-dom";
import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";
import { BiErrorCircle } from "react-icons/bi";
import { FaFileInvoice } from "react-icons/fa";
import { BiReceipt } from "react-icons/bi";
const NavLinks = ({ isBigSidebar }) => {
  const links = [
    { text: "add medicine", path: ".", icon: <FaWpforms /> },
    { text: "all medicine", path: "all-drugs", icon: <MdQueryStats /> },
    {
      text: "Expired Medicine",
      path: "expired-drugs",
      icon: <BiErrorCircle />,
    },
    {
      text: "generate bill",
      path: "add-bill",
      icon: <FaFileInvoice />,
    },
    { text: "all bills", path: "all-bills", icon: <BiReceipt /> },
    { text: "stats", path: "stats", icon: <IoBarChartSharp /> },
    { text: "profile", path: "profile", icon: <ImProfile /> },
    { text: "all users", path: "admin", icon: <MdAdminPanelSettings /> },
    { text: "add user", path: "add-user", icon: <MdAdminPanelSettings /> },
  ];

  const { toggleSidebar, user } = useDashboardContext();

  let isVisitor = user._id === "665444905b50510f3255a969";

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role } = user;

        if (path !== "all-drugs" && isVisitor) return;
        if (path === "admin" && role !== "admin") return;
        else if (path === "stats" && role === "user") {
          return;
        } else if (path === "add-user" && role !== "admin") {
          return;
        } else if (path === "." && role !== "user") {
          return;
        } else if (path === "add-bill" && role !== "user") {
          return;
        }

        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
