import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './components/UI/header/header.component';
import {FooterComponent} from './components/UI/footer/footer.component';
import {ProductsComponent} from './components/products/products.component';
import {BasketComponent} from './components/basket/basket.component';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,

    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatCardModule,
    MatTableModule,
    ProductsComponent,
    MatSortModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    BasketComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
