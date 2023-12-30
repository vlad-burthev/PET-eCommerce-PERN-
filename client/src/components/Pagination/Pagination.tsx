import type { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setPage } from "../../store/deviceSlice/deviceSlice";

interface PaginationProps {}

const Pagination: FC<PaginationProps> = ({ totalPages = 24 }) => {
  const { page: currentPage } = useAppSelector((state) => state.device);
  const dispatch = useAppDispatch();
  const handleClick = (page) => {
    const newPage = Math.min(Math.max(page, 1), totalPages);
    dispatch(setPage(page));
  };

  const pagesToShow = 5;

  const firstPages = Array.from(
    { length: Math.min(pagesToShow, totalPages) },
    (_, i) => i + 1
  );
  const lastPages = Array.from(
    { length: Math.min(pagesToShow, totalPages - pagesToShow) },
    (_, i) => totalPages - pagesToShow + i + 1
  );

  return (
    <ul className="pagination">
      {firstPages.map((page) => (
        <li
          onClick={() => handleClick(page)}
          key={page}
          className={`pagination-item ${currentPage === page ? "active" : ""}`}
        >
          {page}
        </li>
      ))}

      {totalPages > pagesToShow && (
        <li className="pagination-item ellipsis">...</li>
      )}

      {lastPages.map((page) => (
        <li
          key={page}
          onClick={() => handleClick(page)}
          className={`pagination-item ${currentPage === page ? "active" : ""}`}
        >
          {page}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
