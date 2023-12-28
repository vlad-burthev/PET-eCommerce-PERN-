import type { FC } from "react";

//styles
import styles from "./UserManagement.module.scss";
import { useFetchAllUsersQuery } from "../../../services/userAPI";

const UserManagement: FC = () => {
  const { data } = useFetchAllUsersQuery("");
  console.log(data);

  return <div></div>;
};

export default UserManagement;
