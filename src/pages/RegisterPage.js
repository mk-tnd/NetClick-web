import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Head from "../component/Head";
import axios from "../config/axios";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import RegisterProfile from "../component/RegisterProfile";
import RegisterPackage from "../component/RegisterPackage";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  component: {
    backgroundColor: "white",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Select Packages", "Create Profile"];
}

function getStepContent(stepIndex, setActiveStep) {
  switch (stepIndex) {
    case 0:
      return <RegisterPackage setActiveStep={setActiveStep} />;
    case 1:
      return <RegisterProfile />;
    default:
      return "Unknown stepIndex";
  }
}

function RegisterPage() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className={classes.component}>
        <div>
          <Typography className={classes.instructions}>
            {getStepContent(activeStep, setActiveStep)}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
