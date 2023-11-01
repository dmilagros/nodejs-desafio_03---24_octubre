const express = require("express");
const app = express();

const port = 3000;

const ProductManager = require('./ProductManager');

const productManager = new ProductManager('./archivo.json');


app.get("/products", async (req, res) => {
	// console.log('params', req.params);
	// console.log('body', req.body);
	// console.log('query', req.query);

	//* http://localhost:3000/products?limit=2

	const productos = await productManager.getProducts();
	if( productos.length < 1 ){
		return res.json({
			status: "success",
			msg: "Se encontraron 0 productos",
			data: productos,
		});
	} else {
		if(req.query.limit) {
			const qty = Number(req.query.limit)
			const listProducts = productos.slice(0, qty)
			
			return res.json({
				status: "success",
				msg: `${listProducts.length} productos encontrados con exito`,
				data: listProducts,
			});
		} else {
			return res.json({
				status: "success",
				msg: `${productos.length} productos encontrados con exito`,
				data: productos,
			});
		}
	}
});

app.get("/products/:pid", async (req, res) => {
	// console.log('params', req.params);

	//* http://localhost:3000/products/1

  const id = req.params.pid;
	const producto = await productManager.getProducts().find((p) => p.id == id);

  if (producto) {
    return res.json({
      status: "success",
      msg: "producto encontrado con exito",
      data: producto,
    });
  } else {
    return res.json({
      status: "error",
      msg: "no se encontro el producto",
      data: {},
    });
  }
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});



console.log(productManager.getProducts());