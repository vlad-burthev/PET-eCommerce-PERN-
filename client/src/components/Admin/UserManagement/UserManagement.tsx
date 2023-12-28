import { useState, type FC } from "react";

//styles
import styles from "./UserManagement.module.scss";
//types
import { I_User } from "../../../interfaces/interfaces";
//api
import {
  useDeleteUserMutation,
  useFetchAllUsersQuery,
} from "../../../services/userAPI";
import { UIInput } from "../../UI-Kit/UIInput/UIInput";
import { useFilteredArray } from "../../../hooks/useFilteredArray";
import { UIButton } from "../../UI-Kit/UIButton/UIButton";

const UserManagement: FC = () => {
  const { data, isSuccess } = useFetchAllUsersQuery("");
  const [filtered, setFiltered] = useState("");
  const filteredData = useFilteredArray<I_User>({
    data,
    isSuccess,
    filter: filtered,
  });
  const [deleteUser] = useDeleteUserMutation();
  const deleteUserHandler = async (id: number) => {
    await deleteUser(id);
  };

  return (
    <div>
      <div className={styles.header}>
        <UIInput
          value={filtered}
          onChange={(e) => setFiltered(e.target.value)}
          type="text"
          apearence="search"
          placeholder="enter type name to search"
        />
      </div>
      <div className={styles.content}>
        {filteredData &&
          filteredData.map((user: I_User) => (
            <div className={styles.card}>
              <div>
                id: <span>{user.id}</span>
              </div>
              <div>
                name: <span>{user.name}</span>
              </div>
              <div>
                email: <span>{user.email}</span>
              </div>
              <div>
                phone: <span>{user.phone}</span>
              </div>
              <div>
                role: <span>{user.role}</span>
              </div>
              <UIButton
                onClick={() => deleteUserHandler(user.id)}
                appearance="danger"
              >
                delete
              </UIButton>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserManagement;
