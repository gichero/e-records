/** @format */
import React, { useState, useEffect } from "react";
import { commerce } from "./api/commerce";

const App = () => {
	const [products, setProducts] = useState([]);
	const getProducts = async () => {
		const { data } = await commerce.products.list();
		setProducts(data);
	};

	useEffect(() => {
		getProducts();
	}, []);

	console.log(products);

	return (
		<div>
			<h1>Vinyl</h1>
		</div>
	);
};

export default App;
