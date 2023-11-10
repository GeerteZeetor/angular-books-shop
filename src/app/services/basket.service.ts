import {Injectable} from '@angular/core';
import {IBook} from '../models/products';
import {ProductsService} from './products.service';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(private productService: ProductsService) {
  }

  addToBasket(product: IBook, basket: IBook[]) {
    product.added = true;
    this.postToBasket(product, basket);
    this.updateProduct(product);
    this.productService.updateBasket(basket)
  }

  updateProduct(product: IBook) {
    this.productService.updateProduct(product).subscribe((data) => {
    })
  }

  postToBasket(product: IBook, basket:IBook[]) {
    this.productService.postProductToBasket(product, basket).subscribe((data) => {
    })
  }
}
