import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProductComponent } from './components/product/product.component';
import { CreatePageComponent } from './components/create-page/create-page.component';

const routes: Routes = [
  {path:"", redirectTo:"/products", pathMatch:'full'},
  {path:"products", component: MainPageComponent},
  {path:"products/:id", component: ProductComponent},
  {path:"create-product", component: CreatePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
