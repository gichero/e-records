/** @format */
import React, { useState, useEffect } from "react";
import { commerce } from "./api/commerce";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";

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
			<Navbar />
			<Products products={products} />
		</div>
	);
};

export default App;
