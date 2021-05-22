import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import "react-dropdown/style.css";
import axios from "axios";
import { VideoContext } from "../context/VideoContextProvider";

function AddVideo(props) {
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
    form: {
      width: "100%",
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();
  const [content, setContent] = useState({
    name: "",
    vname: "",
    description: "",
  });
  const [category, setCategory] = useState("");
  const { setIsAdd } = useContext(VideoContext);

  const cat = [
    "Action",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Thriller",
  ];

  const handleContentChange = (e) => {
    const { name, value } = e.target;
    setContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleAddVideo = async (e) => {
    const { name, vname, description } = content;
    const categoryId = cat.indexOf(category) + 1;
    e.preventDefault();
    await axios.post("/video/add", {
      thumbnail: vname.split("=")[1],
      name,
      vname,
      description,
      categoryId,
    });
    props.setOpenModal(false);
    setIsAdd(true);
    setContent({
      name: "",
      vname: "",
      description: "",
    });
    setCategory("");
  };

  const handleCloseModal = () => {
    props.setOpenModal(false);
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.openModal}>
          <div className={classes.paper}>
            <div className="container">
              <h2 className="text-center">Add Video</h2>
              <div className="row">
                <form
                  onSubmit={handleAddVideo}
                  className={classes.form}
                  noValidate
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        name="name"
                        variant="outlined"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        value={content.name}
                        onChange={handleContentChange}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="vname"
                        variant="outlined"
                        required
                        fullWidth
                        id="vname"
                        label="Video"
                        value={content.vname}
                        onChange={handleContentChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        id="description"
                        label="Description"
                        name="description"
                        onChange={handleContentChange}
                        value={content.description}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="category"
                        label="Category"
                        name="category"
                        onChange={handleCategory}
                        value={category}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Create
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default AddVideo;
