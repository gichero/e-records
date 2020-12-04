/** @format */
import React, { useState, useEffect } from "react";
import { commerce } from "./api/commerce";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";

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
		<BrowserRouter>
			<div>
				<Navbar totalItems={cart.total_items} />
				<Switch>
					<Route exact path="/">
						<Products products={products} onAddToCart={addToCart} />
					</Route>
					<Route exact path="/cart">
						<Cart cart={cart} />
					</Route>
				</Switch>
			</div>
		</BrowserRouter>
	);
};

export default App;
