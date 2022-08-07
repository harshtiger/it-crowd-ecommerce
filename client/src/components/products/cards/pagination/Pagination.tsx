import React from "react";
import ReactPaginate from "react-paginate";
interface props {
  productList: number,
  handlePageClick: (data: any) => void;
}

export default function Pagination({ productList, handlePageClick }: props): JSX.Element {

  return (

    <ReactPaginate
      pageCount={Math.ceil(productList / 32)}
      nextLabel={">"}
      previousLabel={"<"}
      marginPagesDisplayed={2}
      onPageChange={handlePageClick}
      containerClassName={"pagination justify-content-center"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
    ></ReactPaginate>
  )
}

