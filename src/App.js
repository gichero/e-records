/** @format */
import React, { useState, useEffect } from "react";
import { commerce } from "./api/commerce";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";

const App = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});

	const getProducts = async () => {
		const { data } = await commerce.products.list();
		setProducts(data);
	};

	const getCart = async () => {
		setCart(await commerce.cart.retrieve());
	};

	const addToCart = async (productId, quantity) => {
		const item = await commerce.cart.add(productId, quantity);
		setCart(item.cart);
	};

	useEffect(() => {
		getProducts();
		getCart();
	}, []);

	console.log(cart);

	return (
		<div>
			<Navbar totalItems={cart.total_items} />
			<Products products={products} onAddToCart={addToCart} />
		</div>
	);
};

export default App;
