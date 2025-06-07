import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Observable, map, combineLatest } from 'rxjs';
import { Entry } from '../../models/entry';
import { EntryService } from '../../services/entry.service';

@Component({
  selector: 'app-entries',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent {
  entries$: Observable<Entry[]> = combineLatest([
    this.entryService.getEntries(),
    this.route.queryParamMap.pipe(map(params => params.get('category')))
  ]).pipe(
    map(([entries, category]) => category ? entries.filter(e => e.categoryId === category) : entries)
  );

  constructor(private entryService: EntryService, private route: ActivatedRoute) {}
}
