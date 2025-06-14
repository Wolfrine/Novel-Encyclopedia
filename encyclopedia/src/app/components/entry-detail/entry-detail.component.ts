import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
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

  constructor(route: ActivatedRoute, private service: EntryService, categoryService: CategoryService, private title: Title, private meta: Meta, @Inject(DOCUMENT) private doc: Document) {
    const id = route.snapshot.paramMap.get('id');
    const slug = route.snapshot.paramMap.get('slug');
    if (id) {
      this.entry$ = this.service.getEntry(id);
    } else if (slug) {
      this.entry$ = this.service.getEntryBySlug(slug);
    } else {
      throw new Error('Entry identifier missing');
    }
    this.categoriesMap$ = categoryService.getCategories().pipe(
      map(list => new Map(list.map(c => [c.id!, c])))
    );

    this.entry$.subscribe(entry => {
      if (entry) {
        this.title.setTitle(entry.title);
        this.meta.updateTag({ name: 'description', content: entry.type });
        let link = this.doc.querySelector('link[rel="canonical"]');
        if (!link) {
          link = this.doc.createElement('link');
          link.setAttribute('rel', 'canonical');
          this.doc.head.appendChild(link);
        }
        link.setAttribute('href', `/encyclopedia/${entry.slug}`);
      }
    });
  }
}
