import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IBook} from "../models/products";
import {BehaviorSubject, catchError, mergeMap, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url: string = 'http://localhost:3000/books/'
  urlBasket: string = 'http://localhost:3000/basket'
  private basketSubject = new BehaviorSubject<IBook[]>([]);
  public basket$ = this.basketSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getProductsFromBasket().subscribe();
  }

  getProducts() {
    return this.http.get<IBook[]>(this.url)
  }

  getProduct(id: number) {
    return this.http.get<IBook>(`${this.url}${id}`)
  }

  updateProduct(product: IBook) {
    return this.http.put<IBook>(`${this.url}/${product.id}`, product)
  }

  postProductToBasket(product: IBook, basket: IBook[]) {
    return this.http.post<IBook>(this.urlBasket, product).pipe(
      tap(() => {
        this.getProductsFromBasket().subscribe((newBasket) => {
          this.updateBasket(newBasket);
        });
      }),
      catchError((err) => {
        return err
      })
    );
  }

  getProductsFromBasket() {
    return this.http.get<IBook[]>(this.urlBasket).pipe(
      tap((basket) => {
        this.basketSubject.next(basket);
      })
    );
  }

  deleteProductFromBasket(id: number) {
    return this.http.delete<any>(`${this.urlBasket}/${id}`).pipe(
      catchError(error => {
        console.error('Error delete product to basket:', error);
        return throwError(error);
      })
    )
  }

  updateBasket(newBasket: IBook[]) {
    this.basketSubject.next(newBasket);
  }
}
