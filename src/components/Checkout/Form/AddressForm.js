/** @format */

import React, { useState } from "react";
import {
	InputLabel,
	Select,
	MenuItem,
	Button,
	Grid,
	Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./FormInput";
import { commerce } from "../../../api/commerce";

const AddressForm = () => {
	const [shippingCountries, setShippingCountries] = useState([]);
	const [shippingCountry, setShippingCountry] = useState("");
	const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
	const [shippingSubdivision, setShippingSubdivision] = useState("");
	const [shippingOptions, setShippingOptions] = useState([]);
	const [shippingOption, setShippingOption] = useState("");
	const methods = useForm();

	const getShippingCountries = async (checkoutTokenId) => {
		const { countries } = await commerce.services.localeListShippingCouyntries(
			checkoutTokenId
		);
	};

	return (
		<div>
			<Typography variant="h6" gutterBottom>
				Shipping Address
			</Typography>
			<FormProvider {...methods}>
				<form onSubmit="">
					<Grid container spacing={3}>
						<FormInput required name="firstName" label="First Name" />
						<FormInput required name="lastName" label="Last Name" />
						<FormInput required name="email" label="Email" />
						<FormInput required name="address1" label="Address" />
						<FormInput required name="city" label="City" />
						<FormInput required name="zip" label="Zip / Postal code" />
						{/* <Grid item xs={12} sm={6}>
							<InputLabel>Shipping Country</InputLabel>
							<Select value={} fullWidth onChange={}>
								<MenuItem key={} value={}></MenuItem>
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping State</InputLabel>
							<Select value={} fullWidth onChange={}>
								<MenuItem key={} value={}></MenuItem>
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Options</InputLabel>
							<Select value={} fullWidth onChange={}>
								<MenuItem key={} value={}></MenuItem>
							</Select>
						</Grid> */}
					</Grid>
				</form>
			</FormProvider>
		</div>
	);
};

export default AddressForm;
