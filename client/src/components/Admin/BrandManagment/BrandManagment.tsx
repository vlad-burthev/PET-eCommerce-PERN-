import { useState, type FC, useEffect } from "react";

//styles
import styles from "./BrandManagment.module.scss";
import {
  useCreateBrandMutation,
  useFetchAllBrandsQuery,
  useDeleteBrandMutation,
} from "../../../services/brandAPI";
import { I_Type } from "../../../interfaces/interfaces";
import { UIButton } from "../../UI-Kit/UIButton/UIButton";
import { UIInput } from "../../UI-Kit/UIInput/UIInput";

const BrandManagment: FC = () => {
  const [brandName, setBrandName] = useState("");
  const { data, isSuccess } = useFetchAllBrandsQuery("");

  const [createBrand, { error: errorCreate }]: any = useCreateBrandMutation();
  const [deleteBrand] = useDeleteBrandMutation();

  const [filter, setFilter] = useState<string>("");

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data) {
      const filteredData = data.filter((brand: I_Type) =>
        brand.name.trim().toLowerCase().includes(filter.trim().toLowerCase())
      );
      setFilteredData(filteredData);
    }
  }, [isSuccess, data, filter]);

  const [brandNameError, setBrandNameError] = useState<null | string>(null);

  const createBrandHandler = async () => {
    if (brandName.trim().length > 3) {
      await createBrand(brandName);
      setBrandNameError(null);
      setBrandName("");
      return;
    }
    setBrandNameError("Brand name must be longer than 3 characters");
  };

  const deleteBrandHanlder = async (id: number) => {
    await deleteBrand(id);
  };

  return (
    <div className={styles["brand-menegment"]}>
      <div className={styles.header}>
        <div className={styles["header-form"]}>
          <UIInput
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            type="text"
            apearence="warning"
            placeholder="enter brand name"
          />
          <UIButton onClick={createBrandHandler} appearance="warning">
            create brand
          </UIButton>

          <p>
            {errorCreate?.data?.message ||
              (brandNameError !== null && brandNameError)}
          </p>
        </div>
        <div>
          <UIInput
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            type="text"
            apearence="search"
            placeholder="enter brand name to search"
          />
        </div>
      </div>
      {filteredData ? (
        <ul className={styles.list}>
          {filteredData.map((brand: I_Type, index: number) => (
            <li className={styles.item} key={brand.id}>
              <span>
                {index + 1}. {brand.name}
              </span>
              <UIButton
                onClick={() => deleteBrandHanlder(brand.id)}
                appearance="danger"
              >
                delete
              </UIButton>
            </li>
          ))}
        </ul>
      ) : (
        <p>Brand doesn`t exsits</p>
      )}
    </div>
  );
};

export default BrandManagment;
