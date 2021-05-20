import { createContext, useState } from "react";

export const VideoContext = createContext();

function VideoContextProvider({ children }) {
  const [videos, setVideos] = useState([]);
  return (
    <VideoContext.Provider
      value={{
        videos,
        setVideos,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export default VideoContextProvider;
