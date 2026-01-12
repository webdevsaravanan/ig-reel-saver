import { Component, OnInit } from '@angular/core';
import { ReelStorageService } from '../../services/reel-storage.service';
import { MigrationService } from '../../services/migration.service';
import { Router } from '@angular/router';  
@Component({
  templateUrl: './profile.component.html',
  standalone: false
})
export class ProfileComponent implements OnInit {

  total = 0;
  favorites = 0;
  hashtagStats: { name: string; count: number }[] = [];

  constructor(private storage: ReelStorageService, private router: Router,private migrationService: MigrationService) {}
  async ngOnInit() {
    if (localStorage.getItem('dark') === '1') {
      document.body.classList.add('dark');
    }
    const reels = await this.storage.getAll();

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
  migrateData() { 
    this.migrationService.migrateLocalStorageToDexie();
  }
  openHashtag(hashtag: string) {
    this.router.navigate(['/'], { queryParams: { searchQuery: hashtag } });
      }
}