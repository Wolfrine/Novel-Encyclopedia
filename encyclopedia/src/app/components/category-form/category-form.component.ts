import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { take } from 'rxjs';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {
  form = this.fb.group({
    name: this.fb.nonNullable.control(''),
    imageUrl: this.fb.nonNullable.control('')
  });

  categoryId?: string;

  constructor(
    private fb: FormBuilder,
    private service: CategoryService,
    private router: Router,
    route: ActivatedRoute
  ) {
    const id = route.snapshot.paramMap.get('id');
    if (id) {
      this.categoryId = id;
      this.service.getCategory(id).pipe(take(1)).subscribe(cat => {
        if (cat) {
          this.form.patchValue({ name: cat.name, imageUrl: cat.imageUrl });
        }
      });
    }
  }

  save() {
    const value = this.form.value as Category;
    if (this.categoryId) {
      value.id = this.categoryId;
      this.service.updateCategory(value).then(() => this.router.navigate(['/categories']));
    } else {
      this.service.addCategory(value).then(() => this.router.navigate(['/categories']));
    }
  }
}
