/** @format */

import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";

const AddressForm = ({ checkoutToken }) => {
	const [shippingCountries, setShippingCountries] = useState([]);
	const [shippingCountry, setShippingCountry] = useState("");
	const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
	const [shippingSubdivision, setShippingSubdivision] = useState("");
	const [shippingOptions, setShippingOptions] = useState([]);
	const [shippingOption, setShippingOption] = useState("");
	const methods = useForm();

	const countries = Object.entries(shippingCountries).map(([code, name]) => ({
		id: code,
		label: name,
	}));

	const subdivisions = Object.entries(shippingSubdivisions).map(
		([code, name]) => ({
			id: code,
			label: name,
		})
	);

	const options = shippingOptions.map((option) => ({
		id: option.id,
		label: `${option.description} - (${option.price.formatted_with_symbol})`,
	}));

	const getShippingCountries = async (checkoutTokenId) => {
		const { countries } = await commerce.services.localeListShippingCountries(
			checkoutTokenId
		);
		console.log(countries);
		setShippingCountries(countries);
		setShippingCountry(Object.keys(countries)[0]);
	};

	const getSubDivisions = async (countryCode) => {
		const { subdivisions } = await commerce.services.localeListSubdivisions(
			countryCode
		);
		setShippingSubdivisions(subdivisions);
		setShippingSubdivision(Object.keys(subdivisions)[0]);
	};

	const fetchShippingOptions = async (
		checkoutTokenId,
		country,
		region = null
	) => {
		const options = await commerce.checkout.getShippingOptions(
			checkoutTokenId,
			{
				country,
				region,
			}
		);
		setShippingOptions(options);
		setShippingOption(options[0].id);
	};

	useEffect(() => {
		getShippingCountries(checkoutToken.id);
	}, []);

	useEffect(() => {
		if (shippingCountry) getSubDivisions(shippingCountry);
	}, [shippingCountry]);

	useEffect(() => {
		if (shippingSubdivision)
			fetchShippingOptions(
				checkoutToken.id,
				shippingCountry,
				shippingSubdivision
			);
	}, [shippingSubdivision]);

	return (
		<div>
			<Typography variant="h6" gutterBottom>
				Shipping Address
			</Typography>
			<FormProvider {...methods}>
				<form onSubmit="">
					<Grid container spacing={3}>
						<FormInput name="firstName" label="First Name" />
						<FormInput name="lastName" label="Last Name" />
						<FormInput name="email" label="Email" />
						<FormInput name="address1" label="Address" />
						<FormInput name="city" label="City" />
						<FormInput name="zip" label="Zip / Postal code" />
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Country</InputLabel>
							<Select
								value={shippingCountry}
								fullWidth
								onChange={(event) => setShippingCountry(event.target.value)}
							>
								{countries.map((country) => (
									<MenuItem key={country.id} value={country.id}>
										{country.label}
									</MenuItem>
								))}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping State</InputLabel>
							<Select
								value={shippingSubdivision}
								fullWidth
								onChange={(event) => setShippingSubdivision(event.target.value)}
							>
								{subdivisions.map((subdivision) => (
									<MenuItem key={subdivision.id} value={subdivision.id}>
										{subdivision.label}
									</MenuItem>
								))}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Options</InputLabel>
							<Select
								value={shippingOption}
								fullWidth
								onChange={(event) => setShippingOption(event.target.value)}
							>
								{options.map((option) => (
									<MenuItem key={option.id} value={option.id}>
										{option.label}
									</MenuItem>
								))}
							</Select>
						</Grid>
					</Grid>
					<br />
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<Button component={Link} to="/cart" variant="outlined">
							Back
						</Button>
						<Button component={Link} to="/payment" variant="contained">
							Next
						</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	);
};

export default AddressForm;
