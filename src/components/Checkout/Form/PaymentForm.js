/** @format */

import React from "react";
import { Typography, Buttton, Divider } from "@material-ui/core";
import {
	Elements,
	CardElements,
	ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review";

const PaymentForm = ({ checkoutToken }) => {
	return (
		<div>
			<Review checkoutToken={checkoutToken} />
		</div>
	);
};

export default PaymentForm;
