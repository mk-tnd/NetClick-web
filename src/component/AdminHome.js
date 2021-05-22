import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useContext } from "react";
import { VideoContext } from "../context/VideoContextProvider";
import axios from "../config/axios";
import { useEffect } from "react";

function AdminHome(props) {
  const { videos, setVideos } = useContext(VideoContext);

  const columns = [
    { field: "name", headerName: "name", width: 300 },
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

  const fetchVideos = async () => {
    const res = await axios.get("/video");
    setVideos(res.data.data);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const rows = videos?.map((item) => ({
    id: item.id,
    name: item.name,
    vname: item.vname,
    description: item.description,
    status: item.status,
    category: item.Category.name,
  }));

  return (
    <div style={{ height: 600, width: "100%" }}>
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
