import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "../config/axios";
import Iframe from "react-iframe";
import { VideoContext } from "../context/VideoContextProvider";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function SingleVideoModal() {
  const [video, setVideo] = useState();
  const { vid } = useContext(VideoContext);
  async function getSingleVideo() {
    const res = await axios.get(`/video/single/${vid}`);
    const {
      data: { data },
    } = res;
    setVideo(data);
  }

  useEffect(() => {
    getSingleVideo();
  }, []);

  return (
    <div>
      <div className="text-white">
        <div className="mb-5 ">
          <h2 id="transition-modal-title" className="text-center text-2xl">
            {video?.name}
          </h2>
        </div>
        <div
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 50%",
          }}
        >
          <Iframe
            url={`https://www.youtube.com/embed/${video?.thumbnail}`}
            allowFullScreen
            width="100%"
            height="800px"
          />
        </div>
        <div className="ml-5 mr-5 mb-5 mt-5">
          <h2>Category : {video?.Category.name}</h2>
          {video?.description && <h2>Description : {video?.description}</h2>}
        </div>
      </div>
    </div>
  );
}

export default SingleVideoModal;
