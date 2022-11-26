import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { CategoryService } from 'src/app/services/category.service';
import { EmojiService } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private toast: HotToastService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  categoryForm = this.formBuilder.group({
    icon: 'nerd_face',
    name: '',
  });

  selectEmoji(data: any) {
    console.log(data);
    this.categoryForm.setValue({
      name: this.categoryForm.value.name!,
      icon: data.emoji.shortName,
    });
  }

  isSubmitButtonDisabled(): boolean {
    return !this.categoryForm.value.name;
  }
  onSubmit() {
    this.categoryService
      .createCategory({
        icon: this.categoryForm.value.icon || '',
        name: this.categoryForm.value.name || '',
      })
      .pipe(
        this.toast.observe({
          loading: 'Creating category...',
          error: 'Oops, something went wrong',
          success: 'Category added successfully 🎉',
        }),
        catchError((error) => of(error))
      )
      .subscribe(() => {
        this.categoryForm.reset({ icon: 'nerd_face' });
      });
  }
}
