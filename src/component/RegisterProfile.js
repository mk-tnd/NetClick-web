import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import axios from "../config/axios";
import { UserContext } from "../context/userContextProvider";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        NetClick
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  link: {
    cursor: "pointer",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function RegisterProfile() {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    packageId: "",
  });
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState({});
  const { packageId, setPackageId } = useContext(UserContext);

  function gotoLogin() {
    history.push("/");
  }

  function handleDataChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (name === "Email") {
      if (!value) {
        setError((prev) => ({ ...prev, Email: "email is required" }));
      } else if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          value
        )
      ) {
        setError((prev) => ({ ...prev, Email: "invalid email address" }));
      } else {
        setError((prev) => ({ ...prev, Email: false }));
      }
    }
    if (name === "password") {
      if (!value) {
        setError((prev) => ({ ...prev, Password: "Password is required" }));
      } else {
        setError((prev) => ({ ...prev, Password: false }));
      }
    }
    if (name === "confirmPassword") {
      if (!value) {
        setError((prev) => ({
          ...prev,
          confirmPassword: "ConfirmPassword is required",
        }));
      } else if (value !== data.password) {
        setError((prev) => ({
          ...prev,
          confirmPassword: "password is does not match",
        }));
      } else {
        setError((prev) => ({ ...prev, FirstName: false }));
      }
    }
  }

  const handleSubmit = (e) => {
    const { email, password, confirmPassword } = data;
    e.preventDefault();
    if (password === confirmPassword)
      axios
        .post("/user/register", { email, password, confirmPassword, packageId })
        .then((res) => {
          setData({
            email: "",
            password: "",
            confirmPassword: "",
            packageId: "",
          });
          setPackageId("");
          history.push("/");
        })
        .catch((err) => {
          if (err) {
            setError({ server: err.response.data.message });
            alert(JSON.stringify(error));
          } else {
            setError(err.message);
          }
        });
  };

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="m-3">
                  <TextField
                    error={error.email ? true : false}
                    variant="outlined"
                    required
                    fullWidth
                    id={error.email ? "outlined-error-helper-text" : "email"}
                    label={error.email ? "Error" : "Email"}
                    helperText={error.email || null}
                    name="email"
                    autoComplete="email"
                    value={data.email}
                    autoFocus
                    onChange={handleDataChange}
                  />
                </div>
                <div className="m-3">
                  <TextField
                    error={error.Password ? true : false}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={data.password}
                    onChange={handleDataChange}
                  />
                </div>
                <div className="m-3">
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={data.confirmPassword}
                    onChange={handleDataChange}
                  />
                </div>
              </div>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <div container justify="flex-end">
              <div item>
                <Link
                  className={classes.link}
                  onClick={() => gotoLogin()}
                  variant="body2"
                >
                  Already have an account? Sign in
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default RegisterProfile;
