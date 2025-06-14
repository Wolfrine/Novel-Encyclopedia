import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, docData, Firestore, addDoc, updateDoc, deleteDoc, query, where } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Entry } from '../models/entry';

@Injectable({ providedIn: 'root' })
export class EntryService {
  private firestore = inject(Firestore);
  private entriesRef = collection(this.firestore, 'entries');

  getEntries(): Observable<Entry[]> {
    return collectionData(this.entriesRef, { idField: 'id' }) as Observable<Entry[]>;
  }

  getEntry(id: string): Observable<Entry | undefined> {
    const entryDoc = doc(this.firestore, `entries/${id}`);
    return docData(entryDoc, { idField: 'id' }) as Observable<Entry>;
  }

  getEntryBySlug(slug: string): Observable<Entry | undefined> {
    const entries = query(collection(this.firestore, 'entries'), where('slug', '==', slug));
    return collectionData(entries, { idField: 'id' }).pipe(map(list => list[0])) as Observable<Entry | undefined>;
  }

  addEntry(entry: Entry) {
    return addDoc(this.entriesRef, entry);
  }

  updateEntry(entry: Entry) {
    if (!entry.id) throw new Error('Entry ID missing');
    const entryDoc = doc(this.firestore, `entries/${entry.id}`);
    return updateDoc(entryDoc, { ...entry });
  }

  deleteEntry(id: string) {
    const entryDoc = doc(this.firestore, `entries/${id}`);
    return deleteDoc(entryDoc);
  }
}
