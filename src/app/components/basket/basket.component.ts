import {Component, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSortModule} from '@angular/material/sort';
import {NgIf} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {IBook} from "../../models/products";
import {Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";
import {Router} from '@angular/router';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, NgIf, MatProgressSpinnerModule],
})

export class BasketComponent implements OnInit {
  displayedColumns: string[] = ['image', 'title', 'subtitle', 'price', 'delete'];
  basket!: IBook[];
  basketSubscription!: Subscription
  dataSource = new MatTableDataSource<IBook>([]);

  constructor(private ProductService: ProductsService, private router: Router) {
  }

  ngOnInit() {
    this.basketSubscription = this.ProductService.getProductsFromBasket().subscribe((data) => {
      this.basket = data
      this.dataSource = new MatTableDataSource(this.basket);
    })
  }

  ngOnDestroy() {
    if (this.basketSubscription) {
      this.basketSubscription.unsubscribe()
    }
  }

  navigateToProductDetail(productId: number) {
    this.router.navigate(['/products', productId]);
  }

  deleteFromBasket(product: IBook) {
    setTimeout(() => {
      this.ProductService.deleteProductFromBasket(product.id).subscribe((data) => {
      })
    }, 500)
    this.basket = this.basket.filter((item) => item.id !== product.id)
    this.dataSource = new MatTableDataSource(this.basket);
    this.ProductService.updateBasket(this.basket);
    delete product.added
    this.ProductService.updateProduct(product).subscribe((data) => {
    })
  }

  totalPrice(basket: IBook[]) {
    const total = basket?.reduce((total, book) => {
      const price = Number(book.price.slice(1));
      return (total + price)
    }, 0);
    return total?.toFixed(2)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  protected readonly Number = Number;
}
