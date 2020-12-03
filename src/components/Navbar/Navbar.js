/** @format */

import React from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	Badge,
	MenuItem,
	Menu,
	Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import useStyles from "./navbarStyles";

const Navbar = () => {
	const classes = useStyles();
	return (
		<>
			<AppBar position="fixed" className={classes.appBar} color="inherit">
				<Toolbar>
					<Typography variant="h6" className={classes.title} color="inherit">
						<img alt="e-records" height="25px" className={classes.image} />
						e-records
					</Typography>
					<div className={classes.grow} />
					<div className={classes} />
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Navbar;
