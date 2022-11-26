import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { CategoryService } from 'src/app/services/category.service';

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
    // this.categoryForm.value.icon = data!.shortName;
  }

  onSubmit() {
    this.categoryService
      .createCategory({
        icon: this.categoryForm.value.icon || '',
        name: this.categoryForm.value.name || '',
      })
      .subscribe((data) => {
        this.toast.success('Category added successfully');
      });
  }
}
