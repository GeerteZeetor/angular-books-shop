import {Component, OnInit} from '@angular/core';
import {IBook} from "../../../models/products";
import {Subscription} from "rxjs";
import {ProductsService} from "../../../services/products.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  basket: IBook[] = [];
  basketSubscription!: Subscription;

  constructor(private ProductsService: ProductsService) {
  }

  ngOnInit(): void {
    this.basketSubscription = this.ProductsService.basket$.subscribe((data) => {
      this.basket = data;
    });
  }


  ngOnDestroy() {
    if (this.basketSubscription) {
      this.basketSubscription.unsubscribe()
    }
  }
}
