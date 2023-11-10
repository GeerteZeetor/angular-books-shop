import {ResolveFn, Router} from '@angular/router';
import {IBook} from "../models/products";
import {catchError, EMPTY, Observable} from "rxjs";
import {inject} from "@angular/core";
import {ProductsService} from "./products.service";

export const ProductResolver: ResolveFn<IBook> = (route, state): Observable<IBook> => {
  const productService = inject(ProductsService)
  const router = new Router;
  return productService.getProduct(route.params?.['id']).pipe(
    catchError(() => {
      router.navigate(['/'])
      return EMPTY;
    })
  )
};

