import { Component } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {

  products: any[] = [];
  editingProduct: any = null; // Armazena temporariamente o produto sendo editado

  constructor() { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.products = [
      { id: 1, name: 'Coeio', price: 50, imageUrl: 'assets/images/1.jpeg' },
      { id: 2, name: 'El Mago', price: 50, imageUrl: 'assets/images/2.jpeg' },
    ];
  }

  buyProduct(productId: number) {
    console.log(`Produto com ID ${productId} comprado!`);
  }

  addProduct() {
  
    const newProductId = this.products.length + 1;
    const newProduct = {
      id: newProductId,
      name: `Novo Produto ${newProductId}`,
      price: 50,
      imageUrl: 'URL_DA_NOVA_IMAGEM'
    };
    this.products.push(newProduct);
  }

  editProduct(product: any) {
 
    this.editingProduct = { ...product };
  }

  saveProductEdit() {
   
    const index = this.products.findIndex(p => p.id === this.editingProduct.id);
    if (index !== -1) {
      this.products[index] = { ...this.editingProduct };
      this.editingProduct = null;
    }
  }

  cancelProductEdit() {
  
    this.editingProduct = null;
  }
}