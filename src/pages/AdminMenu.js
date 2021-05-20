import React, { useContext, useEffect, useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AdminHome from "../component/AdminHome";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddVideo from "../component/AddVideo";
import { UserContext } from "../context/userContextProvider";
import axios from "../config/axios";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    backgroundColor: "black",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  root1: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton1: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    top: "auto",
    alignItems: "center",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: drawerWidth,
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
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

function AdminMenu(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { window } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");
  const { user, setUser } = useContext(UserContext);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Avatar
        alt="Cindy Baker"
        src="/static/images/avatar/3.jpg"
        className={classes.large}
      />
      <Typography
        variant="h6"
        color="secondary"
        className="flex justify-center p-2"
      >
        me
      </Typography>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/user/me/:${1}`);
        console.log(res);
        if (user) setUser(res.data.user);
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    getUser();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="secondary" className={classes.title}>
            NetClick
          </Typography>
          <div>
            <IconButton
              onClick={handleOpenModal}
              className="focus:outline-none"
              aria-controls="menu-appbar"
              color="inherit"
            >
              <AddCircleIcon />
            </IconButton>
            <IconButton
              className="focus:outline-none"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <AdminHome />
      </main>
      <AddVideo openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}

export default AdminMenu;
