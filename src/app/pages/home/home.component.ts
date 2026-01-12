import { Component, OnInit } from '@angular/core';
import { ReelStorageService } from '../../services/reel-storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  results: any[] = [];
  private swipeX = 0;
  isFavoriteView = false;

  constructor(private storage: ReelStorageService,private route: ActivatedRoute) {}

  ngOnInit() {
    //if (localStorage.getItem('dark') === '1') {
      document.body.classList.add('dark');
    //}
    this.route.queryParams.subscribe(params => {
      this.isFavoriteView = params['view'] === 'favorite';
      if(params['searchQuery'])
      {
        this.search(params['searchQuery'] || '');
      return;
      }
      this.load();
    });
  }
  
   load() {
    if(this.isFavoriteView){
      this.storage.getFavorites().then(favs => {
        this.results = favs;
      });
      return;
    }
    else{
      this.storage.getAll().then(all => {
        this.results = all;
      });
      return;
    }
  }

  async search(v: string) {
    const data = this.storage.search(v,this.isFavoriteView);
     this.results = await data
  }

  open(r: any) {
    window.location.href = r.reelUrl;
  }

  /* ⭐ Favorite */
  toggleFavorite(r: any) {
    r.favorite = !r.favorite;
    this.storage.update(r);
  }

  /* 🗑 Swipe-to-delete */
  startSwipe(e: TouchEvent, r: any) {
    this.swipeX = e.changedTouches[0].clientX;
  }

  async endSwipe(e: TouchEvent, r: any) {
    const delta = e.changedTouches[0].clientX - this.swipeX;
    if (delta < -80 && confirm('Delete this reel?')) {
      this.storage.delete(r.id);
      this.load();
    }
  }
}
