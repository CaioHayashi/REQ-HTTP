import "./App.css";

import { useState /* useEffect */ } from "react";

// 4 - custom hook
import { useFetch } from "./hooks/useFetch";

function App() {
	/* 	const [products, setProducts] = useState([]);
	 */
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");

	const url = "http://localhost:3000/products";

	// 4 - custom
	const { data: items, httpConfig, loading, error } = useFetch(url);

	// 1 - resgatando dados
	// useEffect(() => {
	// 	async function fetchData() {
	// 		const res = await fetch(url);
	// 		const data = await res.json();

	// 		setProducts(data);
	// 	}
	// 	fetchData();
	// }, []);

	// 2 - adicionando dados
	const handleSubmit = async (e) => {
		e.preventDefault();

		const product = {
			name,
			price
		};

		// 	const res = await fetch(url, {
		// 		method: "POST",
		// 		headers: {
		// 			"Content-Type": "application/json"
		// 		},
		// 		body: JSON.stringify(product)
		// 	});

		// 	// 3 - carregamento dinâmico
		// 	const addedProduct = await res.json();

		// 	setProducts((prevProducts) => [...prevProducts, addedProduct]);

		// 5 - refatorando POST
		httpConfig(product, "POST");

		setName("");
		setPrice("");
	};
	// 8 - desafio 6
	const handleRemove = (id) => {
		httpConfig(id, "DELETE");
	};

	return (
		<div className="App">
			<h1>Lista de Produtos</h1>
			{/* 6 - loading */}
			{loading && <p>Carregando dados...</p>}
			{error && <p>{error}</p>}

			{!loading && (
				<ul>
					{items &&
						items.map((product) => (
							<li key={product.id}>
								{product.name} - R$ {product.price}
								<button
									className="button-delete"
									onClick={() => {
										handleRemove(product.id);
									}}
								>
									Excluir
								</button>
							</li>
						))}
				</ul>
			)}

			<div className="add-product">
				<h2>Criar Produto</h2>

				<form onSubmit={handleSubmit}>
					<label>
						Nome:
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</label>
					<label>
						Preço:
						<input
							type="number"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
					</label>
					{/* 7 - state de loading no post */}
					{loading && <input type="submit" disabled value="Aguarde" />}
					{!loading && <input type="submit" value="Criar" />}
				</form>
			</div>
		</div>
	);
}

export default App;
