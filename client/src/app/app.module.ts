import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DateFnsModule } from 'ngx-date-fns';
import { HotToastModule } from '@ngneat/hot-toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CreateCategoryComponent } from './pages/create-category/create-category.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { ModalModule } from 'angular-custom-modal';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { CategoryTasksComponent } from './pages/category-tasks/category-tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateTaskComponent,
    HomeComponent,
    CategoriesComponent,
    CreateCategoryComponent,
    CalendarComponent,
    TaskCardComponent,
    EditTaskComponent,
    CategoryCardComponent,
    CategoryTasksComponent,
  ],
  imports: [
    DateFnsModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HotToastModule.forRoot({
      position: 'top-left',
    }),
    PickerModule,
    EmojiModule,
    ModalModule,
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent],
})
export class AppModule {}
