import { Component, OnInit } from '@angular/core';
import { ReelStorageService } from '../../services/reel-storage.service';

@Component({
  templateUrl: './profile.component.html',
  standalone: false
})
export class ProfileComponent implements OnInit {

  total = 0;
  favorites = 0;
  hashtagStats: { name: string; count: number }[] = [];

  constructor(private storage: ReelStorageService) {}
  ngOnInit() {
    if (localStorage.getItem('dark') === '1') {
      document.body.classList.add('dark');
    }
    const reels = this.storage.getAll();

    this.total = reels.length;
    this.favorites = reels.filter(r => r.favorite).length;

    const map: any = {};
    reels.forEach(r =>
      r.hashtags.forEach((h: string) => {
        map[h] = (map[h] || 0) + 1;
      })
    );

    this.hashtagStats = Object.keys(map)
      .map(k => ({ name: k, count: map[k] }))
      .sort((a, b) => b.count - a.count);
  }
}