import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { useContext, useEffect } from "react";
import { VideoContext } from "../context/VideoContextProvider";

function SingleVideo() {
  const { videos } = useContext(VideoContext);

  const randomVideo = () => {
    const length = videos.length;
    const random = Math.floor(Math.random() * length);
    return random;
  };

  const vrandom = randomVideo();
  console.log(vrandom);

  return (
    <div style={{ paddingBottom: "670px" }}>
      <div
        className="absolute w-full overflow-hidden"
        style={{ height: "800px", zIndex: "-1" }}
      >
        <img
          className="w-full"
          style={{ height: "1000px", margin: "-120px 0 -140px 0" }}
          src={`https://img.youtube.com/vi/${videos[vrandom]?.thumbnail}/maxresdefault.jpg`}
          alt=""
        />
      </div>
      <div>
        <Container className="absolute" style={{ top: "35%", left: "10%" }}>
          <Typography variant="h4" className="text-white">
            {videos[vrandom]?.name}
          </Typography>
          <Typography variant="h5" className="text-white">
            {videos[vrandom]?.description}
          </Typography>
        </Container>
      </div>
    </div>
  );
}

export default SingleVideo;
