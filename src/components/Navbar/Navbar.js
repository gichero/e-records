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
import logo from "../../media/vinyl.png";

const Navbar = ({ totalItems }) => {
	const classes = useStyles();
	return (
		<>
			<AppBar position="fixed" className={classes.appBar} color="inherit">
				<Toolbar>
					<Typography variant="h6" className={classes.title} color="inherit">
						<img
							src={logo}
							alt="e-records"
							height="25px"
							className={classes.image}
						/>
						vinyl
					</Typography>
					<div className={classes.grow} />
					<div className={classes} />
					<Badge badgeContent={totalItems} color="secondary">
						<ShoppingCart />
					</Badge>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Navbar;
