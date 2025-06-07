import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Entry } from '../../models/entry';
import { EntryService } from '../../services/entry.service';

@Component({
  selector: 'app-entry-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './entry-detail.component.html',
  styleUrls: ['./entry-detail.component.scss']
})
export class EntryDetailComponent {
  entry$: Observable<Entry | undefined>;

  constructor(route: ActivatedRoute, private service: EntryService) {
    const id = route.snapshot.paramMap.get('id')!;
    this.entry$ = this.service.getEntry(id);
  }
}
