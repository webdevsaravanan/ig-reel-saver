import { Injectable } from '@angular/core';
import { ReelItem } from '../models/reel.model';
const KEY = 'saved_reels';
@Injectable({ providedIn: 'root' })
export class ReelStorageService {
  getAll(): ReelItem[] {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  }
  save(reel: ReelItem) {
    const all = this.getAll();
    all.push(reel);
    localStorage.setItem(KEY, JSON.stringify(all));
  }
  search(term: string): ReelItem[] {
    if (!term) return this.getAll();
    const t = term.toLowerCase();
    return this.getAll().filter(r =>
      r.title.toLowerCase().includes(t) ||
      r.hashtags.some(h => h.includes(t))
    );
  }
  getById(id: string) {
    return this.getAll().find(r => r.id === id);
  }

  update(reel: any) {
  const all = this.getAll().map(r => r.id === reel.id ? reel : r);
  localStorage.setItem('saved_reels', JSON.stringify(all));
}

delete(id: string) {
  const all = this.getAll().filter(r => r.id !== id);
  localStorage.setItem('saved_reels', JSON.stringify(all));
}

}
