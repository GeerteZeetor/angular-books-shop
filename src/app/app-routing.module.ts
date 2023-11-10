import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from "./components/products/products.component";
import {ProductDetailComponent} from "./components/product-detail/product-detail.component";
import {BasketComponent} from "./components/basket/basket.component";
import {ProductResolver} from "./services/product.resolver";

const routes: Routes = [
  {path: '', component: ProductsComponent},
  {path: 'products/:id', component: ProductDetailComponent, resolve: {data: ProductResolver}},
  {path: 'basket', component: BasketComponent},
  {path: '**', redirectTo: '', component: ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
