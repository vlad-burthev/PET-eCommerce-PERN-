import { useState, type FC } from "react";

//styles
import styles from "./TypeManagement.module.scss";
import {
  useCreateTypeMutation,
  useFetchAllTypesQuery,
  useDeleteTypeMutation,
} from "../../../services/typeAPI";
import { I_Type } from "../../../interfaces/interfaces";
import { UIButton } from "../../UI-Kit/UIButton/UIButton";
import { UIInput } from "../../UI-Kit/UIInput/UIInput";
import { useFilteredArray } from "../../../hooks/useFilteredArray";

const TypeManagement: FC = () => {
  const [typeName, setTypeName] = useState("");
  const { data, isSuccess } = useFetchAllTypesQuery("");

  const [createType, { error: errorCreate }]: any = useCreateTypeMutation();
  const [deleteType] = useDeleteTypeMutation();

  const [filter, setFilter] = useState<string>("");

  const filteredData = useFilteredArray<I_Type>({ data, isSuccess, filter });

  const [createTypeSucces] = useState<null | boolean>(null);

  const [typeNameError, setTypeNameError] = useState<null | string>(null);

  const createTypeHandler = async () => {
    if (typeName.trim().length > 3) {
      await createType(typeName);
      setTypeNameError(null);
      setTypeName("");
      return;
    }
    setTypeNameError("Type name must be longer than 3 characters");
  };

  const deleteTypeHanlder = async (id: number) => {
    await deleteType(id);
  };

  return (
    <div className={styles["type-menegment"]}>
      <div className={styles.header}>
        <div className={styles["header-form"]}>
          <UIInput
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
            type="text"
            apearence="warning"
            placeholder="enter type name"
          />
          <UIButton
            styleClass={
              createTypeSucces !== null
                ? createTypeSucces
                  ? styles.succes
                  : styles.errorSucces
                : ""
            }
            onClick={createTypeHandler}
            appearance="warning"
          >
            create type
          </UIButton>

          <p>
            {errorCreate?.data?.message ||
              (typeNameError !== null && typeNameError)}
          </p>
        </div>
        <UIInput
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          apearence="search"
          placeholder="enter type name to search"
        />
      </div>
      {filteredData && (
        <ul className={styles.list}>
          {filteredData.map((type: I_Type, index: number) => (
            <li className={styles.item} key={type.id}>
              <span>
                {index + 1}. {type.name}
              </span>
              <UIButton
                onClick={() => deleteTypeHanlder(type.id)}
                appearance="danger"
              >
                delete
              </UIButton>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TypeManagement;
