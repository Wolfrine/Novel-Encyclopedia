import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EntryService } from '../../services/entry.service';
import { Entry } from '../../models/entry';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { QuillModule } from 'ngx-quill';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Observable, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-entry-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, QuillModule],
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent {
  form = this.fb.group({
    slug: this.fb.nonNullable.control(''),
    title: this.fb.nonNullable.control(''),
    type: this.fb.nonNullable.control(''),
    categoryId: this.fb.control<string | null>(null),
    tags: this.fb.array<FormControl<string>>([]),
    content: this.fb.nonNullable.control(''),
    relatedIds: this.fb.array<FormControl<string>>([])
  });

  categories$: Observable<Category[]> = this.categoryService.getCategories();

  get tags(): FormArray<FormControl<string>> {
    return this.form.controls.tags;
  }

  get relatedIds(): FormArray<FormControl<string>> {
    return this.form.controls.relatedIds;
  }

  entryId?: string;

  constructor(
    private fb: FormBuilder,
    private service: EntryService,
    private categoryService: CategoryService,
    private router: Router,
    route: ActivatedRoute
  ) {
    const id = route.snapshot.paramMap.get('id');
    if (id) {
      this.entryId = id;
      this.service.getEntry(id).pipe(take(1)).subscribe(entry => {
        if (entry) {
          this.form.patchValue({
            slug: entry.slug,
            title: entry.title,
            type: entry.type,
            categoryId: entry.categoryId ?? null,
            content: entry.content
          });
          entry.tags?.forEach(t => this.tags.push(this.fb.nonNullable.control(t)));
          entry.relatedIds?.forEach(r => this.relatedIds.push(this.fb.nonNullable.control(r)));
        }
      });
    }
  }

  addTag() {
    this.tags.push(this.fb.nonNullable.control(''));
  }

  removeTag(i: number) {
    this.tags.removeAt(i);
  }

  addRelated() {
    this.relatedIds.push(this.fb.nonNullable.control(''));
  }

  removeRelated(i: number) {
    this.relatedIds.removeAt(i);
  }

  async uploadImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    const current = this.form.controls.content.value || '';
    this.form.controls.content.setValue(current + `<img src="${url}">`);
    input.value = '';
  }

  save() {
    const value = this.form.value as Entry;
    if (this.entryId) {
      value.id = this.entryId;
      this.service.updateEntry(value).then(() => this.router.navigate(['/encyclopedia', value.slug]));
    } else {
      this.service.addEntry(value).then(ref => this.router.navigate(['/encyclopedia', value.slug]));
    }
  }
}
