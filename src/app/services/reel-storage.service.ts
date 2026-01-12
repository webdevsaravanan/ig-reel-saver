import { Injectable } from '@angular/core';
import { ReelItem } from '../models/reel.model';
import { db, Reel } from '../models/db.model';

const KEY = 'saved_reels';
@Injectable({ providedIn: 'root' })
export class ReelStorageService {
  results: any[] = [];
  isFavoriteView = false;
  getAll(){
    return db.reels.orderBy('createdAt').reverse().toArray();
  }
  save(reel: ReelItem) {
    db.reels.add({
    id: reel.id,
    reelUrl: reel.reelUrl,
    title: reel.title,
    favorite: false,
    hashtags: reel.hashtags,
    createdAt: Date.now()
  });
  }
  search(term: string, isFavoriteView: boolean ) {
    if (!term && isFavoriteView) return this.getFavorites();
    if (!term && !isFavoriteView) return this.getAll();
    const t = term.toLowerCase();
    if(isFavoriteView) return db.reels.filter((reel: Reel) => reel.favorite === true && (reel.title.toLowerCase().includes(t) || reel.hashtags.includes(t))).toArray();
    return db.reels.filter((reel: Reel) => reel.title.toLowerCase().includes(t) || reel.hashtags.includes(t)).toArray();
  }
  getById(id: string){
     return db.reels.filter((reel:Reel)=>reel.id===id).toArray();
  }
  getFavorites() {
    return db.reels.filter((reel: Reel) => reel.favorite === true).toArray();
  }
  update(reel: any,updateFav:boolean=false) {
    db.reels.update(reel.id, {
      id: reel.id,
      reelUrl: reel.reelUrl,
      title: reel.title,
      favorite: reel.favorite,
      hashtags: reel.hashtags,
      createdAt: updateFav?reel.createdAt:Date.now()
    });
  }

delete(id: string) {
  db.reels.delete(id);
}

}
