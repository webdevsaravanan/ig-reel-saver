import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReelStorageService } from '../../services/reel-storage.service';
@Component({
  templateUrl: './add-reel.component.html',
  standalone: false
})
export class AddReelComponent implements OnInit {
  reelUrl = ''; title = ''; hashtags = '';
  constructor(private route: ActivatedRoute, private storage: ReelStorageService, private router: Router) {}
  ngOnInit() {
    if (localStorage.getItem('dark') === '1') {
      document.body.classList.add('dark');
    }
    this.reelUrl = this.route.snapshot.queryParamMap.get('reelUrl') || '';
  }
  save() {
    this.storage.save({
      id: Date.now().toString(),
      title: this.title,
      hashtags: this.hashtags.split(',').map(h => h.trim().toLowerCase()),
      reelUrl: this.reelUrl,
      createdAt: Date.now()
    });
    this.router.navigate(['/']);
  }
}
