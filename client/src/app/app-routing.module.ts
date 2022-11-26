import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryTasksComponent } from './pages/category-tasks/category-tasks.component';
import { CreateCategoryComponent } from './pages/create-category/create-category.component';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'task/create', component: CreateTaskComponent },
  { path: 'task/edit/:id', component: EditTaskComponent },
  { path: 'category/create', component: CreateCategoryComponent },
  { path: 'category/:id', component: CategoryTasksComponent },
  { path: 'category/edit/:id', component: EditCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
