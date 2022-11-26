import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { CategoryService } from 'src/app/services/category.service';
import { EmojiService } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { catchError, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private toast: HotToastService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  categoryId!: number;
  ngOnInit(): void {
    this.categoryId = Number.parseInt(
      this.route.snapshot.paramMap.get('id') || '0'
    );
    this.getCategoryToEdit(this.categoryId);
  }

  categoryForm = this.formBuilder.group({
    icon: 'nerd_face',
    name: '',
  });

  selectEmoji(data: any) {
    this.categoryForm.setValue({
      name: this.categoryForm.value.name!,
      icon: data.emoji.shortName,
    });
  }

  isSubmitButtonDisabled(): boolean {
    return !this.categoryForm.value.name;
  }

  getCategoryToEdit(id: number) {
    this.categoryService.getCategoryById(id).subscribe((category) => {
      console.log(category);
      this.categoryForm.setValue({
        name: category.name,
        icon: category.icon,
      });
    });
  }

  onSubmit() {
    this.categoryService
      .updateCategory({
        id: this.categoryId,
        icon: this.categoryForm.value.icon || '',
        name: this.categoryForm.value.name || '',
      })
      .pipe(
        this.toast.observe({
          loading: 'Updating category...',
          error: 'Oops, something went wrong',
          success: 'Category updated successfully 🔁',
        }),
        catchError((error) => of(error))
      )
      .subscribe(console.log);
  }
}
