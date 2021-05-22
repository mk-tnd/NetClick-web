import { createContext, useState } from "react";

export const VideoContext = createContext();

function VideoContextProvider({ children }) {
  const [videos, setVideos] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  return (
    <VideoContext.Provider
      value={{
        videos,
        setVideos,
        isAdd,
        setIsAdd,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export default VideoContextProvider;
