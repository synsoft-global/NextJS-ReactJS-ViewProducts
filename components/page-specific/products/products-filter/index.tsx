import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import FilterOptions from "./filter-options";
import Modal from "react-bootstrap/Modal";

const ProductsFilter = ({
  onChangeFilter,
  productFilter,
  setProductFilter,
  handleResetFilter,
  maxprice,
}) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const isMobile = useMediaQuery({
    query: "(max-width: 1023px)",
  });

  // START Handle filter
  const openFilter = () => {
    setFiltersOpen(!filtersOpen);
  };

  const clolseFilter = () => {
    setFiltersOpen(false);
  };

  // END Handle filter

  return (
    <>
      <div className="products-filter">
        {!isMobile && (
          <FilterOptions
            onChangeFilter={onChangeFilter}
            productFilter={productFilter}
            setProductFilter={setProductFilter}
            handleResetFilter={handleResetFilter}
            maxprice={maxprice}
          />
        )}
      </div>
      {isMobile && (
        <>
          {!filtersOpen && (
            <button
              type="button"
              onClick={openFilter}
              className={`products-filter__menu-btn`}
            >
              {!filtersOpen ? "show" : "close"} filters
            </button>
          )}
          <Modal
            className="pp-modal--tablet-lg-max products-filter-modal"
            show={filtersOpen}
            onHide={clolseFilter}
            dialogClassName="products-filter__modal"
          >
            <Modal.Body>
              <div className="products-filter__modal-content">
                <FilterOptions
                  onChangeFilter={onChangeFilter}
                  productFilter={productFilter}
                  setProductFilter={setProductFilter}
                  handleResetFilter={handleResetFilter}
                  maxprice={maxprice}
                />
              </div>
              <button
                type="button"
                onClick={openFilter}
                className={`products-filter__menu-btn`}
              >
                {!filtersOpen ? "show" : "close"} filters
              </button>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};

export default ProductsFilter;
