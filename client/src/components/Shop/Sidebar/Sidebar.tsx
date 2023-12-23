import { useState, type FC } from "react";

//styles
import styles from "./Sidebar.module.scss";

//api
import { useFetchAllTypesQuery } from "../../../services/typeAPI";

interface I_Type {
  id: number;
  name: string;
}

const Sidebar: FC = () => {
  const { data, isLoading, isSuccess, error } = useFetchAllTypesQuery("");

  const [selectedType, setSelectedType] = useState<number | null>(null);

  console.log({ data, isLoading, isSuccess, error });

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.list}>
        <li
          onClick={() => setSelectedType(null)}
          className={selectedType === null ? styles.active : ""}
        >
          All
        </li>
        {data &&
          data.map(({ id, name }: I_Type) => (
            <li
              onClick={() => setSelectedType(id)}
              className={selectedType === id ? styles.active : ""}
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
