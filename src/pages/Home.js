import React, { useContext, useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import { UserContext } from "../context/userContextProvider";
import axios from "../config/axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Container from "@material-ui/core/Container";
import { VideoContext } from "../context/VideoContextProvider";
import SingleVideo from "../component/SingleVideo";
import { useHistory } from "react-router-dom";
import { useMyContext } from "../context/MyContext";
import Avatar from "@material-ui/core/Avatar";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function Home() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { user, setUser, profileId } = useContext(UserContext);
  const [error, setError] = useState("");
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState("");
  const { videos, setVideos } = useContext(VideoContext);
  const [rVideos, setRVideo] = useState([]);
  const { setVid } = useContext(VideoContext);
  const history = useHistory();
  const { dispatch } = useMyContext();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const fetchVideos = async () => {
    const res = await axios.get(`/video`);
    setVideos(res.data.data);
  };

  const fetchCategory = async () => {
    const res = await axios.get("/category");
    setCategory(res.data.data);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/user/me/${profileId}`);
        if (user) setUser(res.data.data);
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    getUser();
    fetchVideos();
    fetchCategory();
  }, []);

  const options = {
    margin: 10,
    responsiveClass: true,
    nav: false,
    dots: false,
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  };

  const handleProfileMenuOpen = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = (e) => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (e) => {
    e.preventDefault();
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSingleVideo = (id) => {
    setVid(id);
    history.push("/video");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    setRVideo(videos.filter((item) => item.name.includes(search)));
  };

  const handleLogout = () => {
    dispatch({ type: "clearToken" });
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => history.push("/profile")}>Profile</MenuItem>
      {user?.role === "admin" ? (
        <MenuItem onClick={() => history.push("/admin")}>Admin</MenuItem>
      ) : null}
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    ></Menu>
  );

  console.log(user);
  console.log(rVideos);

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <div
            className="absolute w-full overflow-hidden"
            style={{ height: "63px" }}
          >
            <img
              style={{
                width: "150px",
                margin: "-35px 0 -20px 0px",
              }}
              src="https://res.cloudinary.com/dyfaqbpys/image/upload/v1621586565/h4fyyyo736zdnje86gnr.jpg"
              alt=""
            />
          </div>
          <div className={classes.search} style={{ marginLeft: "200px" }}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={search}
              onChange={handleSearch}
            />
            {search && (
              <CloseIcon
                onClick={() => setSearch("")}
                className="relative right-1 cursor-pointer"
              />
            )}
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              className="focus:outline-none"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar src={user.profile?.profilePicture} />
              <Typography
                style={{ paddingLeft: "10px" }}
                variant="h6"
                className="text-white"
              >
                {user.profile?.profileName}
              </Typography>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {search ? (
        <Container className="m-4">
          <Typography variant="h4" className="text-white">
            <b>result of "{search}"</b>
          </Typography>
          <div className="m-3">
            <OwlCarousel className="owl-theme" margin={10} {...options}>
              {rVideos.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSingleVideo(item.id)}
                  className="item"
                >
                  <img
                    src={`https://img.youtube.com/vi/${item.thumbnail}/hqdefault.jpg`}
                    alt=""
                  />
                  <h5 className="text-white p-1">{item.name}</h5>
                </div>
              ))}
            </OwlCarousel>
          </div>
        </Container>
      ) : (
        <>
          <SingleVideo />
          {category.map((val) => (
            <Container key={val.id} className="m-4">
              <Typography variant="h4" className="text-white">
                <b>{val?.name}</b>
              </Typography>
              <div className="m-3">
                <OwlCarousel className="owl-theme" margin={10} {...options}>
                  {videos
                    .filter((item) => val.id === item.categoryId)
                    .map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSingleVideo(item.id)}
                        className="item"
                      >
                        <img
                          src={`https://img.youtube.com/vi/${item.thumbnail}/hqdefault.jpg`}
                          alt=""
                        />
                        <h5 className="text-white p-1">{item.name}</h5>
                      </div>
                    ))}
                </OwlCarousel>
              </div>
            </Container>
          ))}
        </>
      )}
    </div>
  );
}

export default Home;
