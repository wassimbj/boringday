import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CreateCategoryComponent } from './pages/create-category/create-category.component';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "categories", component: CategoriesComponent},
  {path: "p/create", component: CreateTaskComponent},
  {path: "c/create", component: CreateCategoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
