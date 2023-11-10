import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {HttpClient} from '@angular/common/http';
import {NgIf} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {IBook} from "../../models/products";
import {Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";
import {Router} from '@angular/router';
import {BasketService} from "../../services/basket.service";

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, NgIf, MatProgressSpinnerModule],
})

export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['image', 'title', 'subtitle', 'basket', 'price', 'buy'];
  books: IBook[] = [];
  productsSubscription!: Subscription;

  basket!: IBook[]
  basketSubscription!: Subscription;
  dataSource = new MatTableDataSource<IBook>([]);

  @ViewChild(MatSort)
  sort: MatSort | undefined;

  constructor(private BasketService: BasketService, private _liveAnnouncer: LiveAnnouncer, private http: HttpClient, private ProductsService: ProductsService, private router: Router) {
  }

  ngOnInit() {
    this.productsSubscription = this.ProductsService.getProducts().subscribe((data) => {
      this.books = data;
      this.dataSource = new MatTableDataSource(this.books);
      this.initializeSort();
    })
    this.basketSubscription = this.ProductsService.basket$.subscribe((data) => {
      this.basket = data;
    });
  }

  ngOnDestroy() {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe()
    }
  }

  initializeSort() {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  addToBasket(product: IBook, basket: IBook[]) {
    this.BasketService.addToBasket(product, basket);
  }

  navigateToProductDetail(productId: number) {
    this.router.navigate(['/products', productId]);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  protected readonly Number = Number;
}
