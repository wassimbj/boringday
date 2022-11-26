import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/types';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  categories: { items: Category[]; isLoading: boolean } = {
    isLoading: true,
    items: [],
  };

  refreshCategories() {
    this.getCategories();
  }
  
  getCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      console.log(data);
      this.categories = {
        items: data,
        isLoading: false,
      };
    });
  }
}
