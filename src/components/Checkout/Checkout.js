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
	Divider,
	CssBaseline,
} from "@material-ui/core";
import useStyles from "./checkoutStyles";
import AddressForm from "./Form/AddressForm";
import PaymentForm from "./Form/PaymentForm";
import { commerce } from "../../api/commerce";
import { Link, useHistory } from "react-router-dom";

const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart, order, captureCheckout, error }) => {
	const [activeStep, setActiveStep] = useState(0);
	const [checkoutToken, setCheckoutToken] = useState(null);
	const [shippingData, setShippingData] = useState({});
	const classes = useStyles();
	const history = useHistory();

	useEffect(() => {
		const generateToken = async () => {
			try {
				const token = await commerce.checkout.generateToken(cart.id, {
					type: "cart",
				});

				setCheckoutToken(token);
			} catch (error) {
				history.push("/");
			}
		};
		generateToken();
	}, [cart]);

	const nextStep = () =>
		setActiveStep((previousActiveStep) => previousActiveStep + 1);

	const backStep = () =>
		setActiveStep((previousActiveStep) => previousActiveStep - 1);
	const next = (data) => {
		setShippingData(data);
		nextStep();
	};

	const Form = () =>
		activeStep === 0 ? (
			<AddressForm checkoutToken={checkoutToken} next={next} />
		) : (
			<PaymentForm
				checkoutToken={checkoutToken}
				nextStep={nextStep}
				backStep={backStep}
				shippingData={shippingData}
				captureCheckout={captureCheckout}
			/>
		);

	let Confirmation = () =>
		order.customer ? (
			<>
				<div>
					<Typography variant="h5">
						Thank you for your purchase, {order.customer.firstname}{" "}
						{order.customer.lastname}
					</Typography>
					<Divider className={classes.divider} />
					<Typography variant="subtitle2">
						Order ref: {order.customer_reference}
					</Typography>
				</div>
				<br />
				<Button component={Link} to="/" variant="outlined" type="button">
					Home
				</Button>
			</>
		) : (
			<div className={classes.spinner}>
				<CircularProgress />
			</div>
		);

	if (error) {
		<>
			<Typography variant="h5">Error: {error}</Typography>
			<br />
			<Button component={Link} to="/" variant="outlined" type="button">
				Home
			</Button>
		</>;
	}

	return (
		<>
			<CssBaseline />
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
					{activeStep === steps.length ? (
						<Confirmation />
					) : (
						checkoutToken && <Form />
					)}
				</Paper>
			</main>
		</>
	);
};

export default Checkout;
