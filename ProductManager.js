const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      if (data) {
        this.products = JSON.parse(data);
      }
    } catch (error) {
      console.error(`Error al leer el archivo: ${error.message}`);
    }
  }

  saveProducts() {
    try {
      const data = JSON.stringify(this.products);
      fs.writeFileSync(this.path, data);
    } catch (error) {
      console.error(`Error al escribir en el archivo: ${error.message}`);
    }
  }

  addProduct(product) {
    const lastProduct = this.products[this.products.length - 1];
    const id = lastProduct ? lastProduct.id + 1 : 1;
    const newProduct = { id, ...product };
    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
  }

  getProduct(id) {
    return this.products.find(product => product.id === id);
  }

  getProducts() {
    return this.products;
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products[index] = { id, ...updatedProduct };
      this.saveProducts();
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
    }
  }
}

module.exports = ProductManager;
