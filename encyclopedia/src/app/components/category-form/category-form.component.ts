import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { take } from 'rxjs';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

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

  private storage = inject(Storage);

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

  uploadImage(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const fileRef = ref(this.storage, `categories/${Date.now()}_${file.name}`);
    uploadBytes(fileRef, file)
      .then(() => getDownloadURL(fileRef))
      .then(url => this.form.patchValue({ imageUrl: url }));
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
