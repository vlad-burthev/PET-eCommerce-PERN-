import { useState, type FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setPage } from "../../store/deviceSlice/deviceSlice";

import styles from "./Pagination.module.scss";
import classNames from "classnames";

interface PaginationProps {
  count: number;
}

const Pagination: FC<PaginationProps> = ({ count }) => {
  const [pages, setPages] = useState<number[]>([]);
  const { page } = useAppSelector((state) => state.device);
  const dispatch = useAppDispatch();

  const prevPageHandler = () => {
    if (page !== 1) {
      dispatch(setPage(page - 1));
    }
  };
  const nextPageHandler = () => {
    if (page !== Math.ceil(count / 12)) {
      dispatch(setPage(page + 1));
    }
  };
  const selectPageHandler = (selectedPage: number) => {
    dispatch(setPage(selectedPage));
  };

  useEffect(() => {
    const pagesArray = new Array(Math.ceil(count / 12)).fill(0);
    setPages(pagesArray);
  }, [count]);

  return (
    <div className={styles.pagination}>
      <div onClick={prevPageHandler} className={styles.btn}>
        {"<"}
      </div>
      {pages &&
        pages.map((_, i) => (
          <div
            onClick={() => selectPageHandler(i + 1)}
            className={classNames(
              styles["btn__select-page"],
              page === i + 1 ? styles.active : ""
            )}
            key={i}
          >
            {i + 1}
          </div>
        ))}
      <div onClick={nextPageHandler} className={styles.btn}>
        {">"}
      </div>
    </div>
  );
};

export default Pagination;
