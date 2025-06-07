import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Entry } from '../../models/entry';
import { EntryService } from '../../services/entry.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-entry-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './entry-detail.component.html',
  styleUrls: ['./entry-detail.component.scss']
})
export class EntryDetailComponent {
  entry$: Observable<Entry | undefined>;
  categoriesMap$: Observable<Map<string, Category>>;

  constructor(route: ActivatedRoute, private service: EntryService, categoryService: CategoryService) {
    const id = route.snapshot.paramMap.get('id')!;
    this.entry$ = this.service.getEntry(id);
    this.categoriesMap$ = categoryService.getCategories().pipe(
      map(list => new Map(list.map(c => [c.id!, c])))
    );
  }
}
