import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { useContext } from "react";
import { VideoContext } from "../context/VideoContextProvider";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { useHistory } from "react-router-dom";

function SingleVideo() {
  const history = useHistory();
  const { videos, setVid } = useContext(VideoContext);

  const randomVideo = () => {
    const length = videos.length;
    const random = Math.floor(Math.random() * length);
    return random;
  };

  const handleSingleVideo = (id) => {
    setVid(id);
    history.push("/video");
  };

  const vrandom = randomVideo();

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
        <Container
          className="absolute bg-gray-400 bg-opacity-50 rounded-md"
          style={{ top: "35%", left: "10%", width: "600px", padding: "20px" }}
        >
          <Typography variant="h4" className="text-white">
            {videos[vrandom]?.name}
          </Typography>
          <Typography variant="h5" className="text-white">
            {videos[vrandom]?.description}
          </Typography>
          <Button
            onClick={() => handleSingleVideo(videos[vrandom]?.id)}
            style={{ marginTop: "15px" }}
            variant="contained"
            color="secondary"
          >
            <PlayArrowIcon />
            Play
          </Button>
        </Container>
      </div>
    </div>
  );
}

export default SingleVideo;
