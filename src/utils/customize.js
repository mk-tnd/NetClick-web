import { createMuiTheme } from "@material-ui/core/styles";
import black from "@material-ui/core/colors/black";
import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: black[500],
    },
    secondary: {
      main: red[500],
    },
  },
});

export default theme;
