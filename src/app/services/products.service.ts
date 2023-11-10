import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IBook} from "../models/products";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<IBook[]>('http://localhost:3000/books/').subscribe(data => {
    });
  }

  getProduct(id:string) {
    return this.http.get<IBook>(`http://localhost:3000/books/${id}`).subscribe(data => {
    });
  }
}
