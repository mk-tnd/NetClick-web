import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useContext } from "react";
import { VideoContext } from "../context/VideoContextProvider";
import axios from "../config/axios";
import { useEffect } from "react";

function AdminHome(props) {
  const { videos, setVideos } = useContext(VideoContext);

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
    { id: 1, name: "Snow", vname: "Jon", description: 35, status: "" },
    { id: 2, name: "Lannister", vname: "Cersei", description: 42 },
    { id: 3, name: "Lannister", vname: "Jaime", description: 45 },
    { id: 4, name: "Stark", vname: "Arya", description: 16 },
  ];

  const fetchVideos = async () => {
    const res = await axios.get("/video");
    setVideos(res.data.videos);
  };

  useEffect(() => {
    fetchVideos();
    console.log(videos);
  }, []);

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
