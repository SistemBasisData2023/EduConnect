import { TablePagination } from "@mui/material";

const Pagination = ({ totalRows, page, rowsPerPage, set, set }) => {
  return (
    <TablePagination
      rowsPerPageOptions={[5, 15, 30, 50]}
      component="div"
      count={totalRows} //Total Pages
      page={page} // Page
      onPageChange={handleChangePage}
      rowsPerPage={limit} //Limit
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default Pagination;
