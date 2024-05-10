import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookDeatileComponent } from './book-deatile/book-deatile.component';
import { LoginComponent } from './login/login.component';
import { ShopCrtComponent } from './shop-crt/shop-crt.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'book/:id', component:BookDeatileComponent},
  {path:'login', component:LoginComponent},
  {path: 'shop-cart/:id', component:ShopCrtComponent},
  {path:'shopping/:price', component:ShoppingComponent},
  {path:'order-history', component:OrderHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
