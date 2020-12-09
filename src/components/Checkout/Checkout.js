/** @format */

import React, { useState, useEffect } from "react";
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
import AddressForm from "./Form/AddressForm";
import PaymentForm from "./Form/PaymentForm";
import { commerce } from "../../api/commerce";

const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart }) => {
	const [activeStep, setActiveStep] = useState(0);
	const [checkoutToken, setCheckoutToken] = useState(null);
	const classes = useStyles();

	useEffect(() => {
		const generateToken = async () => {
			try {
				const token = commerce.checkout.generateToken(cart.id, {
					type: "cart",
				});
				console.log(token);
				setCheckoutToken(token);
			} catch (error) {}
		};
		generateToken();
	}, []);
	const Form = () => (activeStep === 0 ? <AddressForm /> : <PaymentForm />);

	const Confirmation = () => <div>Confirmation</div>;

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
					{activeStep === steps.length ? <Confirmation /> : <Form />}
				</Paper>
			</main>
		</div>
	);
};

export default Checkout;
