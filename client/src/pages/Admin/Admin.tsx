import { Suspense, type FC } from "react";
import SideBar from "../../components/Admin/Sidebar";

//styles
import styles from "./Admin.module.scss";
import { Outlet } from "react-router-dom";

const Admin: FC = () => {
  return (
    <div className={styles.admin}>
      <SideBar />
      <div>
        <Suspense fallback={<h1>loading</h1>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Admin;
