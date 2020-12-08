/** @format */
import React, { useState, useEffect } from "react";
import { commerce } from "./api/commerce";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";

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
		const { cart } = await commerce.cart.add(productId, quantity);
		setCart(cart);
	};

	const handleUpdateCartQty = async (productId, quantity) => {
		const { cart } = await commerce.cart.update(productId, { quantity });
		setCart(cart);
	};

	const handleRemoveFromCart = async (productId) => {
		const { cart } = await commerce.cart.remove(productId);
		setCart(cart);
	};

	const handleEmptyCart = async () => {
		const { cart } = await commerce.cart.empty();
		setCart(cart);
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
						<Cart
							cart={cart}
							handleUpdateCartQty={handleUpdateCartQty}
							handleRemoveFromCart={handleRemoveFromCart}
							handleEmptyCart={handleEmptyCart}
						/>
					</Route>
					<Route exact path="/checkout">
						<Checkout />
					</Route>
				</Switch>
			</div>
		</BrowserRouter>
	);
};

export default App;
