/** @format */

import React, { useState } from "react";
import {
	Paper,
	Stepper,
	Step,
	StepLabel,
	Typography,
	CircularProgress,
	Button,
	Diveder,
} from "@material-ui/core";
import useStyles from "./checkoutStyles";

const steps = ["Shipping address", "Payment details"];

const Checkout = () => {
	const [activeStep, setActiveStep] = useState(0);
	const classes = useStyles();
	const Form = () => (activeStep === 0 ? <AddressFrom /> : <PaymentForm />);
	return (
		<div>
			<div className={classes.toolBar} />
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography variant="h4" align="center ">
						Checkout
					</Typography>
					<Stepper activeStep={activeStep} className={classes.stepper}>
						{steps.map((step) => (
							<Step key={step}>
								<StepLabel>{step}</StepLabel>
							</Step>
						))}
					</Stepper>
					{activeStep === step.length ? <Confirmation /> : <Form />}
				</Paper>
			</main>
		</div>
	);
};

export default Checkout;
