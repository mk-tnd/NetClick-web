import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "thumbnail", headerName: "Thumbnail", width: 200 },
  { field: "name", headerName: "name", width: 130 },
  { field: "vname", headerName: "source", width: 200 },
  {
    field: "description",
    headerName: "description",
    width: 250,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
  },
  {
    field: "category",
    headerName: "Category",
    width: 160,
  },
];

const rows = [
  { id: 1, thumbnail: 1, name: "Snow", vname: "Jon", description: 35 },
  { id: 2, thumbnail: 2, name: "Lannister", vname: "Cersei", description: 42 },
  { id: 3, thumbnail: 3, name: "Lannister", vname: "Jaime", description: 45 },
  { id: 4, thumbnail: 4, name: "Stark", vname: "Arya", description: 16 },
  {
    id: 5,
    thumbnail: 5,
    lastName: "Targaryen",
    vname: "Daenerys",
    description: null,
  },
  {
    id: 6,
    thumbnail: 6,
    lastName: "Melisandre",
    vname: null,
    description: 150,
  },
  {
    id: 7,
    thumbnail: 7,
    lastName: "Clifford",
    vname: "Ferrara",
    description: 44,
  },
  {
    id: 8,
    thumbnail: 8,
    lastName: "Frances",
    vname: "Rossini",
    description: 36,
  },
  { id: 9, thumbnail: 9, lastName: "Roxie", vname: "Harvey", description: 65 },
];

function AdminHome(props) {
  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        className="bg-white p-3"
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </div>
  );
}

export default AdminHome;
