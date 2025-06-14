import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformServer } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, firstValueFrom, of } from 'rxjs';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

const CATEGORIES_KEY = makeStateKey<Category[]>('categories');

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly state = inject(TransferState);
  categories$: Observable<Category[]>;

  constructor(private categoryService: CategoryService) {
    const existing = this.state.get(CATEGORIES_KEY, null as any);
    if (existing) {
      this.categories$ = of(existing);
    } else {
      this.categories$ = this.categoryService.getCategories();
      if (isPlatformServer(this.platformId)) {
        firstValueFrom(this.categories$).then(cats => this.state.set(CATEGORIES_KEY, cats));
      }
    }
  }
}
