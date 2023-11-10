import {Component} from '@angular/core';
import {IBook} from "../../models/products";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {BasketService} from "../../services/basket.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  product!: IBook;
  productsSubscription!: Subscription;

  basket: IBook[] = [];
  basketSubscription!: Subscription;

  constructor(private route: ActivatedRoute, private ProductsService: ProductsService, private BasketService: BasketService) {
  }

  ngOnInit(): void {
    this.productsSubscription = this.route.data.subscribe((data) => {
      this.product = data['data']
    })
    this.basketSubscription = this.ProductsService.basket$.subscribe((data) => {
      this.basket = data;
    });
  }

  addToBasket(product: IBook, basket: IBook[]) {
   this.BasketService.addToBasket(product, basket)
  }

  ngOnDestroy() {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe()
    }
    if (this.basketSubscription) {
      this.basketSubscription.unsubscribe()
    }
  }

  protected readonly Number = Number;
}
