import React, { useCallback, useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

//import SubmitComponent from "./Components/SubmitButton/SubmitButton";
import FileUploader from './components/FileUploader'


const App = () => {
  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    { field: "make" , sortable: true, filter: true },
    { field: "model", sortable: true, filter: true },
    { field: "price", sortable: true, filter: true },
  ]);

  // const [rowData] = useState ([
  //   { make: "Toyota",  model: "make",  price: "make" },
  //   { make: "Ford",  model: "make",  price: "make" },
  //   { make: "Porsche",  model: "make",  price: "make" },
  // ]);

const [rowData, setRowData] = useState([]);

const onBtnExport = useCallback(() => {
  gridRef.current.api.exportDataAsCsv();
}, []);

// For Fetch - add a variable for the file name at the end of the fetch URL
useEffect(() => {
  fetch("https://www.ag-grid.com/example-assets/row-data.json")
  .then((response) => response.json())
  .then((data) => setRowData(data));
}, []);



return (
<div className="container mt-4">

  <div>
    <FileUploader />
    {console.log(rowData)}
  </div>

  <div class="Export">
    <button onClick={onBtnExport}>Download CSV export file</button>
  </div>


  <div className="ag-theme-alpine" style={{
    height:900, width:900
  }}>
    <AgGridReact
    ref={gridRef}
    pagination={true}
    columnDefs={columnDefs}
    rowData={rowData}
    />

  </div>
</div>
)


};
export default App;


//https://www.youtube.com/watch?v=6PA45adHun8&t=222s
