import type { FC } from "react";

//styles
import styles from "./UserManagment.module.scss";
import { useFetchAllUsersQuery } from "../../../services/userAPI";

const UserManagment: FC = () => {
  const { data } = useFetchAllUsersQuery("");
  console.log(data);

  return <div></div>;
};

export default UserManagment;
