import React, { useEffect, useState } from "react";
import IcPaginationPrev from "assets/icons/IcPaginationPrev";
const Pagination = ({
  total,
  page,
  setpage,
  fetchMoreData,
}) => {
  const [totalArray, setTotalArray] = useState<any>([]);

  useEffect(() => {
    let totalArrayTemp: number[] = [];
    for (let i = 1; i <= Math.ceil(total / 10); i++) {
      totalArrayTemp.push(i);
    }
    setTotalArray(totalArrayTemp);
    return () => {};
  }, []);

  const fetchDataByPage = (numberPage) => {
    setpage(numberPage);
  };

  const previousData = () => {
    if (page > 1) {
      setpage(page - 1);
    }
  };
  
  return (
    <div className="pp-pagination">
      <button
        className={`pp-pagination__prev`}
        disabled={page === 1}
        onClick={previousData}>
        <IcPaginationPrev />
      </button>
      {totalArray.map((item) => (
        <button
          className={`pp-pagination__number ${
            item === page ? "pp-pagination__number--active" : ""
          }`}
          disabled={item === page}
          onClick={() => {
            fetchDataByPage(item);
          }}>
          {item}
        </button>
      ))}
      <button
        className="pp-pagination__next"
        disabled={page === Math.ceil(total / 10)}
        onClick={fetchMoreData}>
        <IcPaginationPrev />
      </button>
    </div>
  );
};

export default Pagination;
