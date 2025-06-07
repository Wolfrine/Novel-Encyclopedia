import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private firestore = inject(Firestore);
  private categoriesRef = collection(this.firestore, 'categories');

  getCategories(): Observable<Category[]> {
    return collectionData(this.categoriesRef, { idField: 'id' }) as Observable<Category[]>;
  }

  getCategory(id: string): Observable<Category | undefined> {
    const categoryDoc = doc(this.firestore, `categories/${id}`);
    return docData(categoryDoc, { idField: 'id' }) as Observable<Category>;
  }

  addCategory(category: Category) {
    return addDoc(this.categoriesRef, category);
  }

  updateCategory(category: Category) {
    if (!category.id) throw new Error('Category ID missing');
    const categoryDoc = doc(this.firestore, `categories/${category.id}`);
    return updateDoc(categoryDoc, { ...category });
  }

  deleteCategory(id: string) {
    const categoryDoc = doc(this.firestore, `categories/${id}`);
    return deleteDoc(categoryDoc);
  }
}
