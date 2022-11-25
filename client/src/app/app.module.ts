import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DateFnsModule } from 'ngx-date-fns';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CreateCategoryComponent } from './pages/create-category/create-category.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateTaskComponent,
    HomeComponent,
    CategoriesComponent,
    CreateCategoryComponent,
    CalendarComponent,
  ],
  imports: [
    DateFnsModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent],
})
export class AppModule {}
