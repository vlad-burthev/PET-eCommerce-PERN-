import type { FC } from "react";

//styles
import styles from "./Sidebar.module.scss";

//components
import { NavLink } from "react-router-dom";

//icons
import TypeIcon from "../icons/category.svg?react";
import DeviceIcon from "../icons/deviceIcons.svg?react";
import UserIcon from "../icons/users.svg?react";
import BrandIcon from "../icons/brands.svg?react";

const SideBar: FC = () => {
  return (
    <div className={styles.sidebar}>
      <NavLink
        className={({ isActive }) => (isActive ? styles["link__active"] : "")}
        to="devices"
      >
        <DeviceIcon />
        devices
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles["link__active"] : "")}
        to="types"
      >
        <TypeIcon />
        types
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles["link__active"] : "")}
        to="brands"
      >
        <BrandIcon />
        brands
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles["link__active"] : "")}
        to="users"
      >
        <UserIcon />
        users
      </NavLink>
    </div>
  );
};

export default SideBar;
