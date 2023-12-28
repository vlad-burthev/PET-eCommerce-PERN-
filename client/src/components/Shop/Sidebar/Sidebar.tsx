import { useState, type FC } from "react";

//styles
import styles from "./Sidebar.module.scss";

//api
import { useFetchAllTypesQuery } from "../../../services/typeAPI";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { setTypeId } from "../../../store/deviceSlice/deviceSlice";

interface I_Type {
  id: number;
  name: string;
}

const Sidebar: FC = () => {
  const { data, isLoading, isSuccess, error } = useFetchAllTypesQuery("");

  const [selectedType, setSelectedType] = useState<number | null>(null);
  const { typeId } = useAppSelector((state) => state.device);
  const dispatch = useAppDispatch();

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.list}>
        <li
          onClick={() => dispatch(setTypeId(null))}
          className={typeId === null ? styles.active : ""}
        >
          All
        </li>
        {data &&
          data.map(({ id, name }: I_Type) => (
            <li
              onClick={() => dispatch(setTypeId(id))}
              className={typeId === id ? styles.active : ""}
              key={id}
            >
              {name}
            </li>
          ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
