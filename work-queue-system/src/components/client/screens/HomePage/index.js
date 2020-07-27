import React from "react";
import {withSnackbar} from "notistack";
import NavigationBar from "../../common/NavigationBar";
import ButtonFilter from "./ButtonFilter";
import TableData from "./TableData";

function HomePage(){
  return(
      <>
        {/*navigation bar*/}
        <NavigationBar />

      {/*Button control*/}
      <ButtonFilter />

      {/* Table*/}
        <TableData />
      </>
  );
};

export default withSnackbar(HomePage);