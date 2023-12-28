import type { FC } from "react";
import { useFetchAllBrandsQuery } from "../../../services/brandAPI";
import { I_Type } from "../../../interfaces/interfaces";

interface BrandsProps {}

//styles
import styles from "./Brands.module.scss";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { setBrandId } from "../../../store/deviceSlice/deviceSlice";

const Brands: FC<BrandsProps> = () => {
  const { data } = useFetchAllBrandsQuery("");
  const { brandId } = useAppSelector((state) => state.device);
  const dispatch = useAppDispatch();
  return (
    <div className={styles.list}>
      <div
        onClick={() => dispatch(setBrandId(null))}
        className={classNames(styles.brands, brandId === null && styles.active)}
      >
        all
      </div>
      {data &&
        data.map((brand: I_Type) => (
          <div
            className={classNames(
              styles.brands,
              brandId === brand.id && styles.active
            )}
            onClick={() => dispatch(setBrandId(brand.id))}
            key={brand.id}
          >
            {brand.name}
          </div>
        ))}
    </div>
  );
};

export default Brands;
