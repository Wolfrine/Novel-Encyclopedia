import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    title: '',
    type: '',
    tags: this.fb.array<string>([]),
    content: '',
    relatedIds: this.fb.array<string>([])
  });

  get tags(): FormArray<string> {
    return this.form.get('tags') as FormArray<string>;
  }

  get relatedIds(): FormArray<string> {
    return this.form.get('relatedIds') as FormArray<string>;
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
          entry.tags?.forEach(t => this.tags.push(this.fb.control(t)));
          entry.relatedIds?.forEach(r => this.relatedIds.push(this.fb.control(r)));
        }
      });
    }
  }

  addTag() {
    this.tags.push(this.fb.control(''));
  }

  removeTag(i: number) {
    this.tags.removeAt(i);
  }

  addRelated() {
    this.relatedIds.push(this.fb.control(''));
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
