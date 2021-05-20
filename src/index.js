import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./utils/customize";
import reportWebVitals from "./reportWebVitals";
import VideoContextProvider from "./context/VideoContextProvider";
import { ContextProvider } from "./context/MyContext";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <VideoContextProvider>
        <ContextProvider>
          <App />
        </ContextProvider>
      </VideoContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
