import type { FC } from "react";

//styles
import styles from "./Shop.module.scss";
import Sidebar from "../../components/Shop/Sidebar/Sidebar";
import Content from "../../components/Shop/Content/Content";

const Shop: FC = () => {
  return (
    <div className={styles.shop}>
      <Sidebar />
      <Content />
    </div>
  );
};

export default Shop;
