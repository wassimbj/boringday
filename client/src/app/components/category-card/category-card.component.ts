import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { catchError, of } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/types';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css'],
})
export class CategoryCardComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private toast: HotToastService
  ) {}

  @Input() category!: Category;
  @Output() onDelete = new EventEmitter<number>();

  ngOnInit(): void {}

  onDeleteCategory(id: number) {
    this.categoryService
      .deleteCategory(id)
      .pipe(
        this.toast.observe({
          loading: 'Deleting category...',
          error: 'Oops, something went wrong',
          success: 'Category has been deleted 🗑️',
        }),
        catchError((error) => of(error))
      )
      .subscribe(() => {
        this.onDelete.emit();
      });
  }
}
