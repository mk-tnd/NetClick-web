import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContextProvider";
import img1 from "../images/img1.png";
import img2 from "../images/img2.png";
import img3 from "../images/img3.png";
import img4 from "../images/img4.png";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { Container, makeStyles } from "@material-ui/core";

function RegisterPackage(prop) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      textAlign: "center",
    },
  }));
  const { packages, setPackages, packageId, setPackageId } =
    useContext(UserContext);

  const handlePackageChoose = (zid) => {
    setPackageId(zid);
    prop.setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const fetchPackage = async () => {
    const res = await axios.get("/package/all");
    setPackages(res.data.packages);
  };

  useEffect(() => {
    fetchPackage();
    console.log(packages);
  }, []);

  const Img = [img1, img2, img3, img4];

  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <div className={classes.root}>
        <h1>Choose Topic Type</h1>
      </div>
      <Grid container spacing={5}>
        {packages.map((item, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            onClick={() => handlePackageChoose(item.id)}
            key={index}
            style={{ cursor: "pointer" }}
          >
            <img src={Img[+item.id - 1]} alt={item.name} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default RegisterPackage;
