import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EntryService } from '../../services/entry.service';
import { Entry } from '../../models/entry';
import { switchMap, take } from 'rxjs';

@Component({
  selector: 'app-entry-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent {
  form = this.fb.group({
    title: this.fb.nonNullable.control(''),
    type: this.fb.nonNullable.control(''),
    tags: this.fb.array<FormControl<string>>([]),
    content: this.fb.nonNullable.control(''),
    relatedIds: this.fb.array<FormControl<string>>([])
  });

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
    private router: Router,
    route: ActivatedRoute
  ) {
    const id = route.snapshot.paramMap.get('id');
    if (id) {
      this.entryId = id;
      this.service.getEntry(id).pipe(take(1)).subscribe(entry => {
        if (entry) {
          this.form.patchValue({
            title: entry.title,
            type: entry.type,
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

  save() {
    const value = this.form.value as Entry;
    if (this.entryId) {
      value.id = this.entryId;
      this.service.updateEntry(value).then(() => this.router.navigate(['/entries', this.entryId]));
    } else {
      this.service.addEntry(value).then(ref => this.router.navigate(['/entries', ref.id]));
    }
  }
}
