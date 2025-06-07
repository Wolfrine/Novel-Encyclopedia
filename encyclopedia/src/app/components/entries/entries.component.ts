import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
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
  entries$: Observable<Entry[]> = this.entryService.getEntries();

  constructor(private entryService: EntryService) {}
}
